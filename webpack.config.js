const { BannerPlugin } = require('webpack');
const path = require('path');
const packageInfo = require('./package.json');

module.exports = {
  mode: 'development',
  entry: {
    'tvgh-library-collection-api': './src/index.ts'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: 'dist/',
    filename: './[name].development.js',
    library: 'tvgh-library-collection-api',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new BannerPlugin({
      banner: `Repository: ${packageInfo.name} | Version: ${packageInfo.version} | Author: ${packageInfo.author} | License: ${packageInfo.license}`
    })
  ]
};
