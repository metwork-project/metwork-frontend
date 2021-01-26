#!/bin/bash
ROOT_DIR="$( cd "$( dirname "$0" )/.." >/dev/null 2>&1 && pwd )"
VERSION=$(cat $ROOT_DIR/config/environment.js | grep version | grep "[0-9.]*" -o)

echo "build $VERSION"

ember build --environment=production --output-path=$ROOT_DIR/builds/$VERSION
