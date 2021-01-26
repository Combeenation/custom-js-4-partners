const cwd = process.cwd();
const path = require('path');

/**
 * @return {webpack.Configuration}
 */
module.exports = function createProductionCfgn() {
  return {
    mode: 'production',
    devtool: 'source-map',
    output: {
      path: path.resolve(cwd, 'dist'),
      filename: 'prod.js',
    },
    entry: [
      'whatwg-fetch',
      './src/index.js',
    ],
    plugins: [],
    performance: {
      maxEntrypointSize: 800 * 1000,
      maxAssetSize: 800 * 1000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [ /src/ ],
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                require.resolve('babel-plugin-transform-class-properties'),
                require.resolve('@babel/plugin-proposal-optional-chaining'),
                require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
              ],
              presets: [
                [
                  'babel-preset-env',
                  {
                    targets: {
                      ie: "11",
                      safari: "10",
                    },
                  },
                ],
              ],
            },
          },
        },{
          test: /\.js$/,
          loader: 'ts-loader',
          include: [ /src/ ],
          exclude: [ /node_modules/ ],
          options: {
            context: cwd,
            configFile: require.resolve('./tsconfig.json'),
          },
        },{
          test: /\.js$/,
          include: [ /src/ ],
          exclude: [ /node_modules/ ],
          loader: 'eslint-loader',
          options: {
            failOnWarning: false,
            failOnError: true,
            configFile: require.resolve('./.eslintrc.json'),
          },
        },{
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        },
      ],
    },
  };
};
