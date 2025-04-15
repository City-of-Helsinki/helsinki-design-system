
#!/bin/sh
HDS_ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../.." &> /dev/null && pwd )"
HDS_DIR_BASENAME="$(basename "$HDS_ROOT_DIR")"

PACKAGE=$1
COMPONENT=$2
COMMAND=""

# if packaga and component are not provided, run all snapshots
if [ -z "$PACKAGE" ] && [ -z "$COMPONENT" ]; then
    COMMAND="yarn start"
fi

# if only package is provided, run snapshots for that package
if [ -n "$PACKAGE" ] && [ -z "$COMPONENT" ]; then
    COMMAND="PACKAGE=${PACKAGE} yarn start-package"
fi

# if both package and component are provided, run snapshots for that component
if [ -n "$PACKAGE" ] && [ -n "$COMPONENT" ]; then
    COMMAND="PACKAGE=${PACKAGE} COMPONENT=${COMPONENT} yarn start-component"
fi

docker run -v ${HDS_ROOT_DIR}:/${HDS_DIR_BASENAME} -it --rm --ipc=host mcr.microsoft.com/playwright:v1.50.0-noble /bin/bash -c "cd /${HDS_DIR_BASENAME}/e2e && ${COMMAND}"
