# AIOS

AIOS is an instruction-only method for helping an AI assistant work from an
owner's relevant context and carry a task from a small request to a reviewed
result. It is not a model, a hosted service, or a replacement for the tools and
permissions supplied by the assistant's native harness.

## Shared method, owner context

The shared AIOS package contains reusable routing and work methods. An owner's
separate AIOS home contains the context they choose to retain: decisions,
connections, personal skills, and owner-specific routes. The package does not
automatically copy that context into repositories or give it to every task.

Independent repositories keep their own instructions, implementation, proof,
and recovery. AIOS loads owner context selectively when an owner-level task
needs it; ordinary repository work begins from that repository's local
instructions and accepted inputs.

## Use the relevant source

AIOS keeps a boundary between durable owner context and work that belongs to a
customer, project, or external system. Customer documentation stays in its
source system. A task may use an authorized, scoped source directly and retain
only a pointer, purpose, and freshness information when that is genuinely
useful. AIOS does not turn external documentation into a copied owner corpus.

If a source is unavailable, stale, inaccessible, or conflicts with another
source, that is an evidence gap—not a reason to invent an answer from memory.

## Native harnesses and access

Codex and Pi are AIOS's supported native routes; each harness needs its own
verification of discovery, access, and behavior. The native harness owns the
model, tools, credentials, permissions, settings, and user interface. AIOS
neither grants access nor performs actions outside the authority already
available to the user and task.

## Continuity between machines

At setup completion, choose continuity explicitly. Private GitHub is a sensible
option for a private owner backup, but it never creates a repository or uploads
your data without your approval. On a missing or genuinely empty chosen home,
AIOS asks whether to Sync existing AIOS or Onboard new; established, partial and
custom homes are preserved rather than restarted.

Sync transfers only approved owner context, personal skills, and owner
format/index metadata. It excludes plugin bodies, credentials, native settings
and history, caches, and nested Project/System repositories. Restore validates
the remote scope and format first, writes only to an absent or empty chosen home,
and never executes restored scripts. A later native bridge registration remains
a separate authorized setup action.

## Getting started and reading more

Start with a small real task and the context you want the assistant to use.
If you have AIOS package access, use the reviewed release and its included
setup and recovery guidance; never paste credentials into a chat. Technical
procedures remain with their owning documentation so this overview can stay a
short public orientation rather than a copy of the executable skill library.

This document is intended for a release-bound public export. Its export record
identifies the exact source commit or release tag, SHA-256, and byte length so
readers can distinguish this overview from a live product or installation
claim.
