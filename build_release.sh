VERSION=$(cat ../metwork-frontend/config/environment.js | grep version | grep "[0-9.]*" -o)

echo "build $VERSION"

ember build --environment=production --output-path=builds/v$VERSION
