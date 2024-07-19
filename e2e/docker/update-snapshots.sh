
#!/bin/sh
HDS_ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../.." &> /dev/null && pwd )"
docker run -v ${HDS_ROOT_DIR}:/helsinki-design-system -it --rm --ipc=host mcr.microsoft.com/playwright:v1.45.1-jammy /bin/bash -c "cd /helsinki-design-system/e2e && yarn update-snapshots"