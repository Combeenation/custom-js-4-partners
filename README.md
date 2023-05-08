# Naming

Info about commonly used abbreviations in this project:

- `cfgr` = configurator
- `cfgrs` = configurators
- `cmp` = component
- `cmps` = components
- `ctrl` = control
- `ctrls` = controls

# Instructions

## Prerequisites in cfgr editor

- Create resource cmp of type `JavaScript` named `CustomJS`
  - Upload a script which should be executed on cfgr startup and name the resource `cfgr`.  
    The naming is important here. Resources named otherwise won't be exeucted on startup.
- Create value cmp named `CustomJSCmps` with the following initial content:

  ```
  // In published cfgrs, the server optimizes the used network bandwidth and only sends information about cmps to the
  // client when necessary.
  //
  // The client basically needs such information for cmps which are used in SigSlos and which are used in custom JS.
  //
  // Whilst the server does know which cmps are used in SigSlos and can automatically optimize this, he has no way of
  // knowing which cmps are used in custom JS. Therefore we need to give him this information manually using this cmp.
  //
  // By default the server only sends the result value of the listet cmps to the client. If more info like the list of
  // all records etc. is needed, a "+" needs to be prepended to the name.

  [
    // Exmaples for how to use this. Replace with real cmp names...
    #Cmp1.Name,           // Only send cmp value to the client
    #Cmp2.Name,           // Only send cmp value to the client
    "+" + #RecordCmp.Name // Send cmp value + additional information like list of all records etc. to the client
  ]
  ```

## How to build & run the code

- Install dependencies using `npm i`
- Creating "production ready" code:
  - Run `npm run build`
  - Upload `dist/prod.js` to the resource `cfgr` in cmp `CustomJS`
- During development:
  - Run `npm run watch`
    - Listens for file changes & runs build automatically in background on such which creates file `dist/dev.js`
    - Starts local webserver which serves the file `dist/dev.js` under `http://localhost:8080/index.js`
  - Add URI param `localcjs=true` to cfgr preview URI
    - Tells the cfgr to load the custom JS file from `http://localhost:8080/index.js` instead of the `CustomJS` resource cmp which allows faster development since one does not have to re-upload every new build
    - The changes in custom JS won't be automatically persited in the configurator.  
      Using the `localcjs=true` URI param only works on your machine when you have `npm run watch` running in the background.
    - To persist your changes, upload the built file `dist/dev.js` or `dist/prod.js` to the resource `cfgr` in cmp `CustomJS`

# Documentation & release notes

- [General Combeenation backend, editor etc.](https://docs.combeenation.com/)
- [Release notes Combeenation backend, editor etc.](https://docs.combeenation.com/docs/release-notes)
- [Custom JS Utils API](https://cjs.docs.combeenation.com/)
- [Custom JS Utils release notes](https://cjs.docs.combeenation.com/pages/Documentation/releases.html)
- [3d Viewer API](https://3dviewer.docs.combeenation.com/)
- [3d Viewer release notes](https://3dviewer.docs.combeenation.com/pages/release-notes/releases/index.html)
