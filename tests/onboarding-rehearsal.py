"""Guard native onboarding declarations; optionally read them through Codex.

The native check is read-only: no install, auth reset or configuration write.
It proves host recognition, not desktop rendering or a new OAuth grant.
"""

import argparse
import json
from pathlib import Path
import selectors
import shutil
import subprocess
import tempfile
import time
import unittest

from native_manifests import validate_native


ROOT = Path(__file__).resolve().parents[1]


def require(condition, message):
    if not condition:
        raise AssertionError(message)


class OnboardingTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="aios-onboarding-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for name in (".codex-plugin", ".claude-plugin", ".cursor-plugin", "skills"):
            shutil.copytree(ROOT / name, self.root / name)
        for name in (".app.json", "package.json", "gemini-extension.json"):
            shutil.copy2(ROOT / name, self.root / name)

    def edit(self, name, edit):
        path = self.root / name
        data = json.loads(path.read_text())
        edit(data)
        path.write_text(json.dumps(data))

    def test_native_contract(self):
        validate_native(self.root, require)

    def test_no_shadowing_manifest(self):
        (self.root / "plugin.json").write_text('{"name":"aios"}')
        with self.assertRaisesRegex(AssertionError, "shadows"):
            validate_native(self.root, require)

    def test_no_required_or_substituted_provider(self):
        for field, value in (("required", True), ("id", "unverified-app")):
            with self.subTest(field=field):
                shutil.copy2(ROOT / ".app.json", self.root / ".app.json")
                self.edit(".app.json", lambda d: d["apps"]["notion"].update({field: value}))
                with self.assertRaisesRegex(AssertionError, "optional native app"):
                    validate_native(self.root, require)

    def test_no_external_or_different_onboarding(self):
        self.edit(".codex-plugin/plugin.json", lambda d: d["extensions"]["com.openai"].update(
            onboardingSkill="../other/SKILL.md"))
        with self.assertRaisesRegex(AssertionError, "packaged Setup"):
            validate_native(self.root, require)

    def test_missing_onboarding_body(self):
        (self.root / "skills/aios-setup/SKILL.md").unlink()
        with self.assertRaisesRegex(AssertionError, "missing packaged Setup"):
            validate_native(self.root, require)

    def test_no_implicit_runtime(self):
        (self.root / "mcp.json").write_text('{"mcpServers":{}}')
        with self.assertRaisesRegex(AssertionError, "unexpected native runtime"):
            validate_native(self.root, require)


def native_check():
    process = subprocess.Popen(
        ["codex", "app-server", "--stdio"], stdin=subprocess.PIPE,
        stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, bufsize=1,
    )
    selector = selectors.DefaultSelector()
    selector.register(process.stdout, selectors.EVENT_READ)

    def request(identity, method, params):
        process.stdin.write(json.dumps({"id": identity, "method": method, "params": params}) + "\n")
        process.stdin.flush()
        deadline = time.monotonic() + 45
        while time.monotonic() < deadline:
            if not selector.select(1):
                continue
            line = process.stdout.readline()
            if not line:
                raise RuntimeError("Codex app-server exited before replying")
            response = json.loads(line)
            if response.get("id") == identity:
                if "error" in response:
                    raise RuntimeError(response["error"])
                return response["result"]
        raise TimeoutError(method)

    try:
        request(1, "initialize", {"clientInfo": {"name": "aios-onboarding-check", "version": "1.0"},
                                  "capabilities": {"experimentalApi": True}})
        process.stdin.write('{"method":"initialized","params":{}}\n')
        process.stdin.flush()
        detail = request(2, "plugin/read", {
            "marketplacePath": str(ROOT / ".agents/plugins/marketplace.json"),
            "pluginName": "aios",
        })["plugin"]
        app_id = json.loads((ROOT / ".app.json").read_text())["apps"]["notion"]["id"]
        require([app["id"] for app in detail["apps"]] == [app_id],
                "Codex did not recognize the native Notion connection")
        setup = detail.get("onboardingSkill")
        require(setup and setup["enabled"] and
                Path(setup["path"]) == ROOT / "skills/aios-setup/SKILL.md",
                "Codex did not expose the selected Setup entry; check plugin enablement")
        require(len(detail["skills"]) == 26 and not detail["mcpServers"] and not detail["hooks"],
                "Unexpected native inventory")
        print("PASS: Codex recognizes Notion, the native Setup entry and 26 skills; no MCP or hooks")
    finally:
        selector.close()
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait(timeout=5)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--native", action="store_true")
    args = parser.parse_args()
    result = unittest.TextTestRunner().run(unittest.defaultTestLoader.loadTestsFromTestCase(OnboardingTest))
    if not result.wasSuccessful():
        raise SystemExit(1)
    if args.native:
        native_check()
