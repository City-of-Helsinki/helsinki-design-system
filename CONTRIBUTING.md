# Contributing Guidelines

Contributions are open even if you don't have a finished solution yet. HDS team will help in including your improvement to the system. Read this guide before contributing code to HDS.

## Sending a pull request

Send pull requests to `development` branch. Right now all pull requests are welcome. If you do not feel that the PR is anywhere near ready, consider opening a draft pull request. Allowing edits for maintainers is also recommended.

1. [Fork the repository](https://github.com/City-of-Helsinki/helsinki-design-system/fork). Select yourself as the owner and press Create fork.

2. Set up your local development environment by following the steps in [DEVELOPMENT.md](/DEVELOPMENT.md), disregarding the cloning part.

3. Create a new branch with prefix `hds-<Ticket number>` if you have a ticket number, otherwise just use prefix `feature/` or `fix/` whichever is more approriate. When submitting large changes split them into light and coherent parts. This sometimes requires sending in multiple PRs. Remember to use short and descriptive commit messages e.g. "Add rotate property for Koros component".

    * Feature – If you intend to change the public API or introduce a new feature.

    * Fix – If you intend to make a code change to solve a production issue.

4. When developing for the `hds-react` package: if you’ve added code that should be tested, add tests! HDS tests are usually simple rendering and functionality checks. Avoid excessive amount of mocking for simplicity's sake and testing for implementation details, i.e. don't test whether function `hideComponent` was called but rather that the component is not visible. This way there are no false negatives when the code is refactored by changing the function name for example, or false positives when the function breaks and doesn't hide the component.

Ensure the test suite and regression tests pass. Remember commit the updated snapshot tests and loki reference images. HDS support includes responsive design so testing on different screen sizes on real devices, simulators, or browser tools is encouraged.

Run snapshot tests:
```bash
yarn test
```

Update jest snapshots:
```bash
yarn test -- -u
```

Run loki tests:
```bash
yarn run visual-test
```

Update loki tests:
```bash
yarn run update-reference-images
```

5. Lint your code. Tip: Lint runs automatically when you build.

```bash
yarn test:lint
```

6. Make a Pull Request on the [HDS Github website](https://github.com/City-of-Helsinki/helsinki-design-system/pulls). If you have a ticket number name the PR e.g. "HDS-1377: number input accessibility fix" so it will automatically link to the ticket. Please be sure to check the open PRs in case somebody is already working on a similar issue. Also to prevent overlapping work notify HDS team by Slack at #designsystem or via email hds@hel.fi.

7. HDS team will review the PR and either add it to the release queue, request changes to it or close it with an explanation. PRs are reviewed with the following quality criteria:

    * Accessibility

    * Usability

    * Visual consistency

    * Compatibility – [Supported browsers](/packages/react/README.md)

    * Performance

    * Security

    * Maintainability – Components should be fully contained and not dependent on neighbour components.

Note! Component contributions that are project specific should be discarded. If a component is used in at least 3 places then it's reusable enough to be added to HDS.
