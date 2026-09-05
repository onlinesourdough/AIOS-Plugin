# Ownership

## Canonical Project

- Name: Online Sourdough Method
- Outcome: Build a maintainable instruction-only Codex and Pi method package with portable owner context, lifecycle routing, safe onboarding and recovery, validated for independent lead Review before authorized release.
- Technical source of truth: this repository
- Lifecycle owner: Online Sourdough product maintainer; accepting lead owns release decisions

## Responsibilities

Record one owner for each material responsibility, data source, external
dependency, trust boundary, and operational decision. Link to the authoritative
contract rather than copying it into this record.

| Responsibility | Source of truth | Owner | Failure or escalation route |
| --- | --- | --- | --- |
| Project outcome | [README.md](../README.md) | Product maintainer | Accepting lead |
| Implementation | This repository | Sole linked worker | Accepting lead Review |
| Operation | Native harness packages | Installing user | Maintainer with sanitized evidence |
| Recovery | [recovery.md](recovery.md) | Maintainer / owner of affected data | Accepting lead |
| 0.1.2 layout and security instructions | [Lifecycle contract](lifecycle.md) | Same product worker | Independent lead Review |
| Machine migration and installed owner state | User-owned environment, outside this repository | Accepting lead / installing user | Separate scoped verification |
| Security enforcement and scanner operation | Native harness and affected repository | Authorized operator / repository owner | Required protection unavailable: hold affected action |

## Boundary

The Project is canonical after creation. Context providers and adjacent
repositories may be referenced as inputs, but they do not own this Project's
runtime truth.

## Historical provenance

- Creation source: `https://github.com/onlinesourdough/Agentic-project-template.git@02cb0e4fc63203f1afb090df8632d20d5aedb9a3`
- This reference records the source used at creation. It is not a runtime
  dependency or a competing source of Project truth.


## Accepted handoff provenance

The original creation contract and design report are identified below.
Revision 2 retains the same worker and bounded goal; exact launch/session/root
attestation is preserved in ignored local evidence and the local lead handoff,
not in distributable instructions. [Lifecycle](lifecycle.md) records the
generic Project state. No private owner context was imported. The owner chose
a new independent Method repository, overriding the report's source-reuse
suggestion. The earlier execution-specific documentation was archived intact
before sanitization; it was not erased or represented as never having existed.

Accepted contract SHA-256: `4dd5277f18f5e3fb2600c57ac9474b08381a0d803bf98e6825f2619b77a78aaf`.
Design report SHA-256: `238dfa581d6114eefea2c608545339b7e7af1a573db5d1443cb951f8bd28506c`.
These immutable content identifiers are provenance, not runtime dependencies.
