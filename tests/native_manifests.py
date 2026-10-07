"""Cross-client contract for AIOS's metadata-only native package."""
import json


def validate_native(root, require):
    def read(name):
        return json.loads((root / name).read_text())

    codex = read('.codex-plugin/plugin.json')
    claude = read('.claude-plugin/plugin.json')
    cursor = read('.cursor-plugin/plugin.json')
    gemini = read('gemini-extension.json')
    package = read('package.json')
    common = {'name', 'version', 'description', 'author', 'repository', 'license'}
    # Codex 0.160.1 ignores app bindings when an Agent Plugins root shadows this
    # manifest. Preserve one skills source through each supported native format.
    require(not (root / 'plugin.json').exists(), 'root manifest shadows native app binding')
    require(all(isinstance(codex[k], str) and codex[k] for k in common - {'author'}) and
            codex['author'] == {'name': 'Online Sourdough'}, 'native metadata types')
    require(set(codex) == common | {'skills', 'interface', 'apps', 'extensions'} and
            set(claude) == common | {'skills'} and
            set(cursor) == {'name', 'version', 'description', 'skills'} and
            set(gemini) == {'name', 'version', 'description'}, 'unexpected native component field')
    require(codex['apps'] == './.app.json' and
            read('.app.json') == {'apps': {'notion': {
                'id': 'asdk_app_69c18c28f1188191bf5b8445c4ab0a2e',
                'required': False, 'category': 'Context'}}},
            'Notion must remain the verified optional native app')
    require(codex['extensions'] == {'com.openai': {
                'onboardingSkill': './skills/aios-setup/SKILL.md'}},
            'onboarding must use the packaged Setup skill')
    setup = root / 'skills/aios-setup/SKILL.md'
    require(setup.is_file() and not setup.is_symlink(), 'missing packaged Setup skill')
    for native in (codex, claude, cursor, gemini, package):
        require(all(native[k] == codex[k] for k in ('name', 'version', 'description')),
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
            all(entry[k] == codex[k] for k in ('name', 'version', 'description')),
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
