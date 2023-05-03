const { merge } = require('webpack-merge');
const createProductionCfgn = require('./webpack.common');

const mainFileName = require('./package.json').main;
const prodCfgn = createProductionCfgn(mainFileName);

module.exports = merge(prodCfgn, {
    // Add project specific production configs & overrides here...
  });
  
