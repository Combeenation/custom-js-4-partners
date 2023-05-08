const cwd = process.cwd();
const path = require("path");
const webpack = require(require.resolve("webpack", { paths: [cwd] }));
const HiveInterfaceToObjectPlugin = require("@combeenation/webpack-hive-itf-to-obj-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

/**
 * Production settings
 * - "Repo wide" dev specific overrides can be found in "webpack.global.dev.js"
 * - Further project specific overrides can be found in "project/folder/webpack.dev" & "project/folder/webpack.prod"
 *
 * @param {string} mainFileName
 * @return {webpack.Configuration}
 */
module.exports = function createProductionCfgn(mainFileName) {
  return {
    mode: "production",
    devtool: "source-map",
    output: {
      path: path.resolve(cwd, "dist"),
      filename: mainFileName.replace(".js", ".build.min.js"),
    },
    entry: ["whatwg-fetch", "./src/" + mainFileName],
    plugins: [
      new HiveInterfaceToObjectPlugin(),
      new ESLintPlugin(),
      // watchOptions.ignored not working due to backslashes in the path (Windows)
      new webpack.WatchIgnorePlugin({ paths: [/node_modules/, /typings-generated-objs/] }),
    ],
    performance: {
      maxEntrypointSize: 800 * 1000,
      maxAssetSize: 800 * 1000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [/src/],
          use: {
            loader: "babel-loader",
            options: {
              plugins: [
                require.resolve("babel-plugin-transform-class-properties"),
                require.resolve("@babel/plugin-proposal-optional-chaining"),
                require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
              ],
              presets: [
                [
                  require.resolve("@babel/preset-env"),
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
        },
        {
          test: /\.js$/,
          loader: "ts-loader",
          include: [/src/],
          exclude: [/node_modules/],
          options: {
            context: cwd,
            configFile: path.resolve(cwd, "tsconfig.json"),
          },
        },
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre",
          // temporarily disable shapediver source maps
          exclude: [path.resolve(cwd, "node_modules/@shapediver"), path.resolve(cwd, "node_modules/@sentry")],
        },
      ],
    },
  };
};
