"""Exercise the release export against isolated source revisions, without network."""

import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("public_docs", ROOT / "scripts/public_docs.py")
docs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(docs)


class PublicDocsTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="aios-public-docs-")
        self.addCleanup(self.temporary.cleanup)
        self.base = Path(self.temporary.name)
        self.root = self.base / "source"
        self.root.mkdir()
        self.run_git("init", "-q")
        self.run_git("config", "user.email", "test@example.invalid")
        self.run_git("config", "user.name", "Documentation fixture")
        self.run_git("remote", "add", "origin", docs.PROJECT + ".git")
        (self.root / "docs/public").mkdir(parents=True)
        self.document = b"# AIOS\n\nAIOS version: 0.9.0\n\nPublic orientation.\n"
        (self.root / docs.SOURCE_PATH).write_bytes(self.document)
        (self.root / "plugin.json").write_text(json.dumps({"version": "0.9.0"}))
        (self.root / "package.json").write_text(json.dumps({
            "version": "0.9.0", "files": [docs.SOURCE_PATH],
        }))
        (self.root / "private.md").write_text("Must never be exported.\n")
        self.commit()

    def run_git(self, *arguments):
        return subprocess.run(["git", "-C", str(self.root), *arguments],
                              check=True, capture_output=True).stdout.decode().strip()

    def commit(self):
        self.run_git("add", ".")
        self.run_git("commit", "-qm", "Fixture")
        return self.run_git("rev-parse", "HEAD")

    def test_exact_revision_and_only_approved_files(self):
        commit = self.run_git("rev-parse", "HEAD")
        (self.root / docs.SOURCE_PATH).write_text("Uncommitted replacement\n")
        output = self.base / "export"
        metadata = docs.export(self.root, commit, output)
        self.assertEqual(sorted(p.name for p in output.iterdir()), ["aios.md", "aios.meta.json"])
        self.assertEqual((output / "aios.md").read_bytes(), self.document)
        self.assertEqual(metadata["commit"], commit)
        self.assertEqual(metadata["version"], "0.9.0")
        self.assertEqual(json.loads((output / "aios.meta.json").read_text()), metadata)

    def test_version_drift_and_missing_package_file(self):
        (self.root / "plugin.json").write_text('{"version":"0.10.0"}')
        with self.assertRaisesRegex(ValueError, "version mismatch"):
            docs.check(self.root)
        (self.root / "package.json").write_text('{"version":"0.10.0","files":[]}')
        with self.assertRaisesRegex(ValueError, "explicitly included"):
            docs.check(self.root)

    def test_wrong_header_cannot_be_exported(self):
        (self.root / docs.SOURCE_PATH).write_text("# AIOS\n\nAIOS version: 0.8.0\n")
        self.commit()
        output = self.base / "export"
        with self.assertRaisesRegex(ValueError, "version must match"):
            docs.export(self.root, "HEAD", output)
        self.assertFalse(output.exists())

    def test_wrong_origin_is_rejected_without_echoing_credentials(self):
        self.run_git("remote", "set-url", "origin", "https://private-token@example.invalid/repo")
        with self.assertRaisesRegex(ValueError, "^AIOS source origin mismatch\\.$"):
            docs.export(self.root, "HEAD", self.base / "export")

    def test_release_export_is_not_overwritten(self):
        output = self.base / "export"
        docs.export(self.root, "HEAD", output)
        before = (output / "aios.md").read_bytes()
        with self.assertRaisesRegex(ValueError, "already exists"):
            docs.export(self.root, "HEAD", output)
        self.assertEqual((output / "aios.md").read_bytes(), before)

    def test_release_tag_must_match_the_package(self):
        with self.assertRaisesRegex(ValueError, "Release tag version"):
            docs.export(self.root, "HEAD", self.base / "export", "0.8.0")

    def test_symlink_is_rejected(self):
        document = self.root / docs.SOURCE_PATH
        document.unlink()
        document.symlink_to("../../private.md")
        self.commit()
        with self.assertRaisesRegex(ValueError, "regular source files"):
            docs.export(self.root, "HEAD", self.base / "export")


if __name__ == "__main__":
    unittest.main()
