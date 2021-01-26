/**
 * Local webserver which serves custom JS under the alias "index.js"
 * 
 * Optional command line args:
 * 
 *     • --cfgfile=webpack.dev.js: By default we're retrieving the name of the file to serve from webpacks production
 *                                 config file ("webpack.prod.js" in the CWD). This can be overwritten here.
 */

const cwd = process.cwd();
const path = require('path');
const staticAlias = require('node-static-alias');

const defaultCfgFileName = 'webpack.prod.js';
const cfgFileCmdLineArgValue = process.argv.find(val => val.startsWith('--cfgfile='));
const cfgFileName = cfgFileCmdLineArgValue ? cfgFileCmdLineArgValue.substr('--cfgfile='.length) : defaultCfgFileName;
const webPackConfig = require(path.join(cwd, cfgFileName));

const jsFileName = webPackConfig && webPackConfig.output && webPackConfig.output.filename;
if (jsFileName) {
  // The cfgr will always request the custom JS from http://localhost:8080/index.js, therefore we need some dynamic
  // requestpath-filename-mappping here
  const fileServer = new staticAlias.Server('./dist', {
    alias: {
      match: '/index.js',
      serve: jsFileName,
    }
  });
  
  console.warn('Serving file:', jsFileName);

  require('http').createServer(function(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    req
      .addListener('end', () => fileServer.serve(req, res))
      .resume();
  }).listen(8080);
}
