"""Exercise real archive boundaries, reproducibility and extracted stdio runtime."""
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('release_packer', ROOT / 'scripts/package_release.py')
packer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(packer)


class ReleasePackageTest(unittest.TestCase):
    def test_reproducible_archives_and_extracted_protocol(self):
        with tempfile.TemporaryDirectory(prefix='aios-release-') as scratch:
            home = Path(scratch)
            a, b = home / 'a', home / 'b'
            version = packer.build(a)
            packer.build(b)
            self.assertEqual({p.name: p.read_bytes() for p in a.iterdir()},
                             {p.name: p.read_bytes() for p in b.iterdir()})
            for row in (a / 'SHA256SUMS').read_text().splitlines():
                digest, name = row.split('  ')
                self.assertEqual(digest, hashlib.sha256((a / name).read_bytes()).hexdigest())
            for flavor in ('codex', 'portable'):
                with zipfile.ZipFile(a / f'aios-{flavor}-{version}.zip') as archive:
                    self.assertIsNone(archive.testzip())
                    names = set(archive.namelist())
                    self.assertFalse(any(p.startswith(('tests/', 'apps/', 'packaging/')) for p in names))
                    self.assertEqual(len([p for p in names if p.startswith('skills/') and p.endswith('/SKILL.md')]), 24)
                    manifest = json.loads(archive.read('.codex-plugin/plugin.json'))
                    if flavor == 'portable':
                        self.assertIn('plugin.json', names)
                        self.assertNotIn('mcpServers', manifest)
                        self.assertFalse(any(p.startswith('runtime/') for p in names))
                        continue
                    self.assertNotIn('plugin.json', names)  # native MCP declaration must take effect
                    config = json.loads(archive.read(manifest['mcpServers'][2:]))
                    self.assertEqual(config['mcpServers']['aios']['command'], 'node')
                    extracted = home / 'installed'
                    archive.extractall(extracted)
                    subprocess.run(['node', str(ROOT / 'apps/overview/smoke.mjs'),
                                    str(extracted / 'runtime/overview/server.mjs')], check=True,
                                   cwd=extracted, env={**__import__('os').environ,
                                                      'AIOS_HOME': str(home / 'missing-owner')})

    def test_runtime_configuration_tampering_rejected(self):
        with tempfile.TemporaryDirectory(prefix='aios-release-negative-') as scratch:
            copy = Path(scratch) / 'repo'
            shutil.copytree(ROOT, copy, ignore=shutil.ignore_patterns('.git', 'node_modules', 'dist', '__pycache__'))
            (copy / '.codex-plugin/mcp.json').write_text('{"mcpServers":{"aios":{"command":"curl"}}}')
            with self.assertRaisesRegex(ValueError, 'runtime configuration'):
                packer.build(Path(scratch) / 'out', copy)

    def test_shadowing_portable_manifest_rejected(self):
        with tempfile.TemporaryDirectory(prefix='aios-release-shadow-') as scratch:
            copy = Path(scratch) / 'repo'
            shutil.copytree(ROOT, copy, ignore=shutil.ignore_patterns('.git', 'node_modules', 'dist', '__pycache__'))
            shutil.copyfile(copy / 'packaging/portable-plugin.json', copy / 'plugin.json')
            with self.assertRaisesRegex(ValueError, 'shadows Codex runtime'):
                packer.build(Path(scratch) / 'out', copy)


if __name__ == '__main__':
    unittest.main()
