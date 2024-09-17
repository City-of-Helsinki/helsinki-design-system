# E2E Testing README

This document provides instructions on how to use the `run.sh` and `update-snapshots.sh` scripts located in the `docker` directory as well as give some hints how to write tests (ongoing process).

## Prerequisites

- Docker installed on your machine
- Necessary permissions to execute shell scripts

## Usage

Before running the tests build the corresponding Storybooks which the tests are ran against.

### Running Tests

To run all the end-to-end tests, use the `run.sh` script:

```sh
cd docker
./run.sh
```

If you wish to run only certain package's tests (core for example):

```sh
cd docker
./run.sh core
```

Or if you want to run only a certain component's tests (react button for example):

```sh
cd docker
./run.sh react button
```


These scripts run the Docker container, executing the tests inside the container.

### Updating Snapshots

If you need to update the snapshots, use the `update-snapshots.sh` script:

```sh
cd docker
./update-snapshots.sh
```

If you with to be more precise, use same targetting manner as in running the tests (for example update only core tag reference images):

```sh
cd docker
./update-snapshots.sh core tag
```

This script will update the snapshot files used in the tests.

## Writing tests

- To be implemented....

## Notes

- Do not run the scripts in `package.json` locally since the screenshots will most likely differ from the ones created in CI and will cause the tests to fail.

- If you need to update Playwright version in the project, you need to match the versions in `package.json`'s `devDependencies` and the docker scripts (used Docker images).

For further assistance, refer to the project documentation or contact the development team.