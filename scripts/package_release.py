"""Build deterministic native Codex and portable skills ZIPs from one source."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tests'))
from native_manifests import validate_native
from package_documentation import check


def require(ok, message):
    if not ok:
        raise ValueError(message)


def collect(root, relative):
    base = root / relative
    require(base.exists() and not base.is_symlink(), 'Missing/linked product path: ' + relative)
    result = {}
    for path in sorted(base.rglob('*')) if base.is_dir() else [base]:
        require(not path.is_symlink(), 'Product symlink: ' + str(path))
        if path.is_file():
            name = path.relative_to(root).as_posix()
            require(not any(p in name.split('/') for p in ('.git', 'node_modules', '__pycache__')),
                    'Author content in package: ' + name)
            result[name] = path.read_bytes()
    return result


def encoded(value):
    return (json.dumps(value, indent=2, ensure_ascii=False) + '\n').encode()


def payloads(root=ROOT):
    validate_native(root, require)
    version = json.loads((root / '.codex-plugin/plugin.json').read_text())['version']
    require(re.fullmatch(r'\d+\.\d+\.\d+', version), 'Invalid release version')
    check(root, 'v' + version)
    common = {}
    for name in ('skills', 'assets/icon.png', 'LICENSE', 'docs/aios.md',
                 '.claude-plugin', '.cursor-plugin', 'gemini-extension.json'):
        common.update(collect(root, name))
    common['README.md'] = (f'# AIOS {version}\n\n'
        'Context and skills for your AI assistant. Your owner home and personal skills '
        'stay separate from the plugin.\n\n'
        'Read [the included overview](docs/aios.md). '
        'Installation, update and removal: '
        '[AIOS on GitHub](https://github.com/onlinesourdough/AIOS-Plugin).\n\n'
        'The Codex package includes a local overview requiring Node.js 22 or newer. '
        'The portable package contains skills only. There is no hosted owner-data service, '
        'install script or background Git sync.\n').encode()
    codex = {**common, **collect(root, '.codex-plugin'),
             **collect(root, 'runtime/overview'),
             **collect(root, '.agents/plugins/marketplace.json'),
             'package.json': (root / 'package.json').read_bytes()}
    portable_manifest = json.loads((root / 'packaging/portable-plugin.json').read_text())
    overlay = json.loads((root / '.codex-plugin/plugin.json').read_text())
    del overlay['mcpServers']
    overlay['interface']['longDescription'] = (
        'Twenty-four portable AIOS skills for context, planning, design, content and '
        'reviewed delivery. Setup and explicit Git sync continue in your agent conversation. '
        'Your app owns projects, models and permissions. The local overview is available '
        'in the separate Codex package.')
    overlay['interface']['capabilities'] = ['AIOS skills', 'Owner context', 'Reviewed delivery']
    overlay['interface']['defaultPrompt'] = ['Set up AIOS for my current work.']
    package = json.loads((root / 'package.json').read_text())
    package['files'] = [p for p in package['files'] if p != 'runtime/overview'] + ['plugin.json']
    portable = {**common, 'plugin.json': encoded(portable_manifest),
                '.codex-plugin/plugin.json': encoded(overlay), 'package.json': encoded(package)}
    for flavor, files in (('codex', codex), ('portable', portable)):
        for name, data in files.items():
            require(not name.startswith('/') and '..' not in name.split('/'), 'Unsafe archive path')
            if name.endswith(('.md', '.json', '.mjs', '.html', '.py', '.txt', '.yaml')):
                require(not re.search(rb'/(?:Users|home)/[\w.-]+/', data), 'Private path in ' + name)
        require(len([p for p in files if re.fullmatch(r'skills/[^/]+/SKILL.md', p)]) == 24,
                flavor + ' skill inventory')
    return version, {'codex': codex, 'portable': portable}


def build(destination, root=ROOT):
    version, packages = payloads(root)
    destination.mkdir(parents=True, exist_ok=True)
    sums = []
    for flavor, files in packages.items():
        target = destination / f'aios-{flavor}-{version}.zip'
        with zipfile.ZipFile(target, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
            for name, data in sorted(files.items()):
                info = zipfile.ZipInfo(name, (1980, 1, 1, 0, 0, 0))
                info.create_system = 3
                info.external_attr = 0o100644 << 16
                info.compress_type = zipfile.ZIP_DEFLATED
                archive.writestr(info, data, compresslevel=9)
        sums.append(hashlib.sha256(target.read_bytes()).hexdigest() + '  ' + target.name)
    (destination / 'SHA256SUMS').write_text('\n'.join(sums) + '\n')
    return version


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', type=Path, default=ROOT / 'dist/release')
    args = parser.parse_args()
    print('Built AIOS ' + build(args.out) + ' Codex and portable ZIPs with SHA256SUMS.')
