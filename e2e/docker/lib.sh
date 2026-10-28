#!/usr/bin/env bash

# Shared Docker setup for e2e scripts. Source from run.sh / update-snapshots.sh.

HDS_ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
HDS_DIR_BASENAME="$(basename "$HDS_ROOT_DIR")"

hds_e2e_docker_run() {
  local command="$1"
  local container_root="/${HDS_DIR_BASENAME}"

  # pnpm installs the container dependencies into node_modules.e2e so the host
  # node_modules stays untouched. Node only looks up node_modules, so show the
  # container install at e2e/node_modules. Test files resolve that path first.
  mkdir -p "${HDS_ROOT_DIR}/e2e/node_modules.e2e"

  docker run --platform=linux/amd64 \
    -v "${HDS_ROOT_DIR}:${container_root}" \
    -v "${HDS_ROOT_DIR}/e2e/node_modules.e2e:${container_root}/e2e/node_modules" \
    -i --rm --ipc=host \
    -e CI=true \
    -e "pnpm_config_store_dir=/${HDS_DIR_BASENAME}/e2e/.pnpm-store" \
    -e "pnpm_config_modules_dir=node_modules.e2e" \
    -e "pnpm_config_package_import_method=copy" \
    mcr.microsoft.com/playwright:v1.64.1-noble \
    /bin/bash -s <<EOF
set -e
corepack enable
corepack prepare "\$(node -p "require('/${HDS_DIR_BASENAME}/package.json').packageManager")" --activate
cd /${HDS_DIR_BASENAME}

mkdir -p e2e/.pnpm-store

# pnpm must create node_modules.e2e as a real directory; a symlink causes ENOTDIR on mkdir.
if [ -L node_modules.e2e ]; then
  rm -f node_modules.e2e
fi

MODULES_MARKER="node_modules.e2e/.modules.yaml"
if [ ! -f "\${MODULES_MARKER}" ] || [ pnpm-lock.yaml -nt "\${MODULES_MARKER}" ]; then
  pnpm install --frozen-lockfile --ignore-scripts
else
  echo "Skipping pnpm install (node_modules.e2e is up to date)"
fi

cd e2e
${command}
EOF
}
