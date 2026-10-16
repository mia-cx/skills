---
name: testing
description: Use when the user asks to write, fix, review, or prune tests, or to work test-first (TDD, red-green), and before you add a test to any change.
---

# Testing

A test is proof that a behaviour works. It is not a record of effort. Every test costs runtime, review time, and one more thing that breaks on the next refactor, so each test has to buy proof that nothing else gives.

## The bar

A test fails when the behaviour it names breaks, and only then. Before you keep a test, write its line: "Proves <behaviour a caller or user relies on>." If the line names a function call, a type, or a constant, delete the test.

Some facts already have their proof somewhere else. Leave them there:

- Types and shapes: the type checker.
- Library and framework behaviour: the library's own suite.
- A removed feature: the deletion itself.
- A visual change: the before-and-after screenshots.

## How many

Match the count to the change:

| Change | Tests |
| --- | --- |
| Bug fix | One test that reproduces the bug. Watch it fail first. |
| New behaviour | The main path, plus the failure a user hits first. |
| Refactor | None new. The existing tests pass unchanged, and that is the proof. |
| Config, docs, copy, styling | None. Run the nearest check: build, typecheck, render. |

Pure logic with a real input space (parsers, maths, state machines, money) earns more cases. Put them in one table-driven test, one row per case with its own reason to exist.

## Where

Test at the highest layer that is still fast and deterministic. Usually that is the module's public interface with its real collaborators. One test through the interface beats ten tests of its parts: it survives refactors and it covers the wiring.

- Unit tests: pure core logic.
- Integration tests: the default for everything else.
- End-to-end tests: one per critical user journey, the success path and one failure, on the real stack.

When the interface itself is undecided, settle it with `codebase-design` first.

## Writing one

- Treat the code as a black box. Call the public interface and assert on what a caller can observe. If renaming a private helper would break the test, rewrite it at the interface.
- Take expected values from outside the code: a literal, a worked example, the spec. A test that computes the answer the way the code does passes by construction.
- Fake only what you don't own and can't run locally: the network (MSW or a stub server), the clock, randomness. Use a real or in-memory database. Past two fakes in one test, move the test up a layer.
- Spy only on a callback the caller passes in, or on a boundary side effect like "the email was sent".
- Each test reads top to bottom on its own. Repeat setup inline. Share a helper only for identical mechanical setup, like rendering a component or starting a server, and let it take overrides for the data that varies.

## Red to green

For bug fixes and test-first work: write one failing test, watch it fail for the reason you expect, write the least code that passes, repeat. One test per cycle, so each test answers what the last cycle taught you. Tests written all up front lock in imagined behaviour.

## Keeping the suite honest

- Flaky means it fails on unchanged code. Find the cause (time, ordering, shared state, a real network call) and fix it. If you can't, delete the test and name the deletion in the commit, because a suite people rerun until green proves nothing.
- A test that fails after your change is evidence about your change. Fix the code. When the behaviour changed on purpose, update the assertion and say why in the commit.
- While working, run the test files you touched. Run the full suite once at the end.

## Reporting

List each new test with its "Proves" line. The test count is not a claim.
