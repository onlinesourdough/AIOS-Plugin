"""Cross-client contract for AIOS's metadata-only native package."""
import json


def validate_native(root, require):
    def read(name):
        return json.loads((root / name).read_text())

    portable = read('plugin.json')
    codex = read('.codex-plugin/plugin.json')
    claude = read('.claude-plugin/plugin.json')
    cursor = read('.cursor-plugin/plugin.json')
    gemini = read('gemini-extension.json')
    package = read('package.json')
    common = {'name', 'version', 'description', 'author', 'repository', 'license'}
    # Deliberately narrow subset of Agent Plugins 1.0.0: no runtime overlay.
    require(set(portable) == common | {'$schema'} and
            portable['$schema'] == 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
            'portable schema or components')
    require(all(isinstance(portable[k], str) and portable[k] for k in common - {'author'}) and
            portable['author'] == {'name': 'Online Sourdough'}, 'portable metadata types')
    require(set(codex) == common | {'skills', 'interface', 'extensions', 'homepage'} and
            set(claude) == common | {'skills'} and
            set(cursor) == {'name', 'version', 'description', 'skills'} and
            set(gemini) == {'name', 'version', 'description'}, 'unexpected native component field')
    onboarding = './skills/aios-setup/SKILL.md'
    require(codex['extensions'] == {'com.openai': {'onboardingSkill': onboarding}} and
            (root / onboarding).is_file() and not (root / onboarding).is_symlink(),
            'getting-started entry must select bundled Setup without runtime extensions')
    require(codex['homepage'] == codex['interface'].get('websiteURL')
            == 'https://onlinesourdough.com/' and
            codex['interface'].get('supportURL')
            == 'https://github.com/onlinesourdough/AIOS-Plugin/issues',
            'catalog must link to the publisher website and public issue support')
    for native in (codex, claude, cursor, gemini, package):
        require(all(native[k] == portable[k] for k in ('name', 'version', 'description')),
                'native identity/version drift')
    for native in (codex, claude, cursor):
        require((root / native['skills']).resolve() == (root / 'skills').resolve(),
                'native split skill source')
    market = read('.claude-plugin/marketplace.json')
    require(market['name'] == 'online-sourdough' and len(market['plugins']) == 1,
            'Claude marketplace identity')
    entry = market['plugins'][0]
    require(set(entry) == {'name', 'source', 'version', 'description'} and
            entry['source'] == './' and
            all(entry[k] == portable[k] for k in ('name', 'version', 'description')),
            'Claude marketplace source/version')
    for folder, expected in (('.codex-plugin', {'plugin.json'}),
                             ('.claude-plugin', {'plugin.json', 'marketplace.json'}),
                             ('.cursor-plugin', {'plugin.json'})):
        require({p.name for p in (root / folder).iterdir()} == expected,
                'extra native metadata file')
    # Clients discover some runtime components even when manifests omit them.
    for name in ('hooks', 'hooks.json', 'agents', 'commands', 'settings.json',
                 '.mcp.json', 'mcp.json', '.lsp.json', 'lsp.json', 'extensions',
                 'output-styles', 'monitors', 'workflows', 'bin', 'themes',
                 '.github/plugin', '.plugin', 'marketplace.json'):
        require(not (root / name).exists(), 'unexpected native runtime: ' + name)
