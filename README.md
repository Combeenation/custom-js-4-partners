# Instructions

* Install dependencies using `npm i`
* During development:
  + Run `npm run watch`
  + Add URI param `localcjs=true` to cfgr preview URI
    - This loads the build files from `localhost` instead of the `CustomJS` component which allows faster development since one does not have to re-upload every new build
    - The changes in custom JS won't be persited in the configurator this way. They only work on your machine when you have `npm run watch` running in the background
    - To persist the changes, upload the build (`dist/dev.js` or `dist/prod.js`) to the resource `cfgr` in component `CustomJS`
* Creating "production ready" code:
  + Run `npm run build`
  + Upload `dist/prod.js` to the resource `cfgr` in component `CustomJS`
