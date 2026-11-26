---
name: prune-tests
description: Sweep a test suite and delete the tests that prove nothing.
disable-model-invocation: true
---

# Prune tests

Read [testing](../testing/SKILL.md) first. Its bar decides which tests stay; this skill applies that bar to a suite that already exists.

1. **Scope.** Prune the paths the user names, or the whole suite if they name none. Run the suite once and note which tests already fail, so a failure after pruning is never blamed on a deletion.
2. **Judge.** Read every test in scope and write its "Proves" line. A test goes when it has no line, or when it fails the bar in testing:
   - it breaks when the code changes but the behaviour doesn't, such as a renamed private helper or a reworded string;
   - it asserts that a removed feature is gone;
   - it can never fail, because it computes its expected value the way the code does or asserts only on its own mocks;
   - it re-proves what the type checker or a library's own suite already proves.
3. **Keep the proof.** When a doomed test is the only proof of behaviour a caller relies on, rewrite it at the public interface instead of deleting it.
4. **Delete.** Remove the tests, and any helpers, fixtures and mocks only they used. Run the suite: everything that passed before still passes.
5. **Commit.** Commit the deletions with a body that lists each removed test and the reason it failed the bar, one line each.

Report the tests removed, the tests rewritten with their new "Proves" lines, and the suite's runtime before and after.
