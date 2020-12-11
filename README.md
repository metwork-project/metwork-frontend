# metwork-frontend

This code corespond to the frontend part of [MetWork](https://metwork.pharmacie.parisdescartes.fr/) web platform, written with EmberJS framework.

## Install dev environment

You must install [nvm](https://github.com/nvm-sh/nvm#install-script) and use node version 12.14.1

```
nvm install 12.14.1
nvm use 12.14.1
npm i npm@latest -g
npm i yarn -g
npm install -g ember-cli
yarn
cp -R node_modules/underscore bower_components/
```

## Run dev environment

```
ember serve
```

## Build distribution

```
VERSION=$(cat ../metwork-frontend/config/environment.js | grep version | grep "[0-9.]*" -o)
ember build --environment=production --output-path=builds/v$VERSION
```