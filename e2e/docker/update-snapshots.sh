#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

PACKAGE=${1:-}
COMPONENT=${2:-}

if [ -z "$PACKAGE" ] && [ -z "$COMPONENT" ]; then
  COMMAND="pnpm update-snapshots"
elif [ -n "$PACKAGE" ] && [ -z "$COMPONENT" ]; then
  COMMAND="PACKAGE=${PACKAGE} pnpm update-snapshots-package"
elif [ -n "$PACKAGE" ] && [ -n "$COMPONENT" ]; then
  COMMAND="PACKAGE=${PACKAGE} COMPONENT=${COMPONENT} pnpm update-snapshots-component"
else
  echo "Invalid arguments" >&2
  exit 1
fi

hds_e2e_docker_run "${COMMAND}"
