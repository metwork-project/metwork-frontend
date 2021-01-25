VERSION=$(cat ../metwork-frontend/config/environment.js | grep version | grep "[0-9.]*" -o)

# cd source/metwork-frontend

# echo $PWD

echo "publish $VERSION"

rsync -a --delete ../metwork-frontend/builds/v$VERSION/ metwork@194.254.93.160:/var/www/metwork-frontend
