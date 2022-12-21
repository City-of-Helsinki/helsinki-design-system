# Contributing Guidelines

Contributions are open even if you don't have a finished solution yet. HDS team will help in including your improvement to the system. Read this guide before contributing code to HDS.

## Sending a pull request

Send pull requests to `master` branch. Right now all pull requests are welcome. If you do not feel that the PR is anywhere near ready, consider opening a draft pull request. Allowing edits for maintainers is also recommended.

1. Set up your local development environment by following the steps in [DEVELOPMENT.md](/DEVELOPMENT.md). Use short and descriptive commit messages e.g. "Add rotate property for Koros component".

2. Create a new branch with prefix `hds-<Ticket number>` if you have a ticket number, otherwise just use prefix `feature/` or `fix/` whichever is more approriate. When submitting large changes split them into light and coherent parts. This sometimes requires sending in multiple PRs.

    * Feature – If you intend to change the public API or introduce a new feature.

    * Fix – If you intend to make a code change to solve a production issue.

3. If you’ve added code that should be tested, add tests! Ensure the test suite passes and Jest snapshot tests are updated by running the following command. Also commit the updated snapshot tests. HDS support includes responsive design so testing on different screen sizes on real devices, simulators, or browser tools is encouraged.

```bash
yarn test -- -u
```

4. Lint your code. Tip: Lint runs automatically when you build.

```bash
yarn test:lint
```

5. Make a Pull Request on the [HDS Github website](https://github.com/City-of-Helsinki/helsinki-design-system/pulls). If you have a ticket number name the PR e.g. "HDS-1377: number input accessibility fix" so it will automatically link to the ticket. Please be sure to check the open PRs in case somebody is already working on a similar issue. Also to prevent overlapping work notify HDS team by Slack at #designsystem or via email hds@hel.fi.

6. HDS team will review the PR and either add it to the release queue, request changes to it or close it with an explanation. PRs are reviewed with the following quality criteria:

    * Accessibility

    * Usability

    * Visual consistency

    * Compatibility – [Supported browsers](/packages/react/README.md)

    * Performance

    * Security

    * Maintainability – Components should be fully contained and not dependent on neighbour components.

Note! Component contributions that are project specific should be discarded. If a component is used in at least 3 places then it's reusable enough to be added to HDS.
