"""Exercise frontmatter and version transitions with synthetic skill payloads."""

import unittest

from skill_metadata import parse_frontmatter, skill_version, validate_change, version_key


def skill(version='"1.0.0"', body="Do the accepted work.\n"):
    return ("---\nname: sample\ndescription: Perform a bounded task.\n"
            'metadata:\n  short-description: "Preserve me"\n'
            f"  version: {version}\n---\n\n{body}")


def files(version='"1.0.0"', body="Do the accepted work.\n", **resources):
    return {"SKILL.md": skill(version, body).encode(), **resources}


class MetadataTests(unittest.TestCase):
    def test_preserves_nested_metadata(self):
        result = parse_frontmatter(skill())
        self.assertEqual(result["metadata"], {"short-description": "Preserve me", "version": "1.0.0"})
        self.assertNotIn("version", result)
        self.assertEqual(skill_version(result), "1.0.0")

    def test_rejects_malformed_or_nonportable_metadata(self):
        examples = [
            skill().replace("metadata:\n", "metadata: []\n"),
            skill().replace('  version: "1.0.0"', 'version: "1.0.0"'),
            skill().replace('  version: "1.0.0"', '  version: "1.0.0"\n  version: "2.0.0"'),
            skill().replace('  version: "1.0.0"', '    version: "1.0.0"'),
            skill().replace("name: sample", "name: sample\nname: duplicate"),
            skill().replace('  version: "1.0.0"\n', ''),
            skill().replace("metadata:", "version:"),
            skill().replace("description: Perform a bounded task.", "description: |\n  ambiguous"),
        ]
        examples += [skill().replace("Perform a bounded task.", value)
                     for value in ("- item", "? key", ": value", "# comment", "] item", "1e3", "2026-09-12", "on", "Task:", "true ", "null ")]
        examples += [skill(value) for value in ('1.0.0', '1', 'true', '[]', 'null', '"01.0.0"',
                                               '"1.0"', '"v1.0.0"', '"1.0.0-01"', '"1.0.0+"')]
        for text in examples:
            with self.subTest(text=text), self.assertRaises(AssertionError):
                skill_version(parse_frontmatter(text))

    def test_quoted_yaml_indicators_remain_strings(self):
        for value in ("- item", "? key", ": value", "# comment", "] item", "1e3", "2026-09-12", "on", "Task:", "true ", "null "):
            source = skill().replace("Perform a bounded task.", '"' + value + '"')
            self.assertEqual(parse_frontmatter(source)["description"], value)

    def test_semver_order(self):
        ordered = ['1.0.0-alpha', '1.0.0-alpha.1', '1.0.0-alpha.beta',
                   '1.0.0-beta', '1.0.0-beta.2', '1.0.0-beta.11', '1.0.0-rc.1',
                   '1.0.0', '1.0.1', '1.1.0', '2.0.0']
        self.assertEqual(sorted(reversed(ordered), key=version_key), ordered)
        self.assertEqual(version_key('1.0.0+build.01'), version_key('1.0.0+other'))
        self.assertEqual(skill_version(parse_frontmatter(skill("'1.0.0'"))), '1.0.0')

    def test_initialization_and_unchanged(self):
        validate_change({}, files())
        old = {"SKILL.md": b"---\nname: sample\ndescription: A task.\n---\nOld body\n"}
        validate_change(old, files())
        validate_change(files(), files())
        with self.assertRaisesRegex(AssertionError, "initial"):
            validate_change({}, files('"0.7.0"'))

    def test_changed_body_description_or_resource_requires_bump(self):
        changes = [files(body="Changed decision.\n"),
                   files(**{"references/rule.md": b"Added resource"}),
                   {"SKILL.md": skill().replace("a bounded task", "another task").encode()}]
        for after in changes:
            with self.subTest(after=after), self.assertRaisesRegex(AssertionError, "bump"):
                validate_change(files(), after)
        with self.assertRaisesRegex(AssertionError, "bump"):
            validate_change(files(**{"old.md": b"removed"}), files())
        with self.assertRaisesRegex(AssertionError, "bump"):
            validate_change(files(**{"rule.md": b"old"}), files(**{"rule.md": b"new"}))

    def test_independent_bumps_and_regression(self):
        for version in ('"1.0.1"', '"1.1.0"', '"2.0.0"'):
            validate_change(files(), files(version, body="Changed.\n"))
        for version in ('"0.9.0"', '"1.0.0-rc.1"'):
            with self.assertRaisesRegex(AssertionError, "regressed"):
                validate_change(files(), files(version))
        with self.assertRaisesRegex(AssertionError, "bump"):
            validate_change(files(), files('"1.0.0+build"', body="Changed.\n"))


if __name__ == "__main__":
    unittest.main()
