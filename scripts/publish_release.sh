#!/bin/bash
ROOT_DIR="$( cd "$( dirname "$0" )/.." >/dev/null 2>&1 && pwd )"
VERSION=$(cat $ROOT_DIR/config/environment.js | grep version | grep "[0-9.]*" -o)

# cd source/metwork-frontend

# echo $PWD

echo "publish $VERSION"

rsync -a --delete $ROOT_DIR/builds/$VERSION/ metwork@194.254.93.160:/var/www/metwork-frontend
