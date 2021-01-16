const { BannerPlugin } = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");
const packageInfo = require("./package.json");

const DEVELOPMENT = "development";
const PRODUCTION = "production";

const commonConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    "tvgh-library-collection-crawler": "./src/index.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: process.env.NODE_ENV === PRODUCTION ? "./[name].min.js" : "./[name].js",
    library: "tvgh-library-collection-crawler",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new BannerPlugin({
      banner: `@banner Repository: ${packageInfo.name} | Version: ${packageInfo.version} | Author: ${packageInfo.author} | License: ${packageInfo.license}`,
    }),
  ],
};

const prodConfig = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
              comments: /@banner/i,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

const runBeforeWebpack = () => {
  switch (process.env.NODE_ENV) {
    case DEVELOPMENT:
      return commonConfig;
    case PRODUCTION:
      return Object.assign({}, commonConfig, prodConfig);
    default:
      throw new Error(`process.env.NODE_ENV does NOT match with "${DEVELOPMENT}" or "${PRODUCTION}".`);
  }
};

module.exports = runBeforeWebpack;
