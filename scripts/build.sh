#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo 'Installing deps...'
yarn install --immutable

echo 'Building app...'
yarn build

echo 'Done. Build output is in ./site'
