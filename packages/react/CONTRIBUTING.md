# Contributing Guidelines

Code ownership and a formal PR approval process is currently in draft phase. Any suggestions and contributions are welcome at this point.

## Sending a pull request

Send pull requests to `master` branch. Right now all pull requests are welcome. If you do not feel that the PR is anywhere near ready, consider opening a draft pull request. Allowing edits from maintainers is also recommended.

Create branches with prefixes `bugfix/`, `feature/` and `hotfix/`.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take over it but you should still leave a comment.

We will review your pull request and either merge it, request changes to it, or close it with an explanation.

### Before submitting a pull request, please make sure the following is done:

1. Fork the repository and create your branch from proper branch.

2. Run `yarn` in the repository root.

3. If you’ve fixed a bug or added code that should be tested, add tests!

4. Ensure the test suite passes (`yarn test`)

- [ ] TODO: 5. Run `yarn test -- -u` to update jest snapshot and commit these changes as well (if has).

6. Make sure your code lints (`yarn test:lint`). Tip: Lint runs automatically when you build.

### Development workflow

See [DEVELOPMENT.md](/DEVELOPMENT.md).

### Proposing a change

If you intend to change the public API or introduce new feature, create a feature request issue.

### Evaluating a component candidate

1. Code ownership and a formal PR approval process.
2. Component contributions that are project specific should be discarded. Design System owners should assess this.
3. If a component is used in 1-2 places in your project then it's probably not reusable.
4. Components should be fully contained and not dependent on neighbour components.
