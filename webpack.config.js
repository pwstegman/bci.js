const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');
const moment = require('moment');

let banner = `bci.js v${pkg.version}
https://github.com/pwstegman/bci.js

License: ${pkg.license}
Generated ${moment().utc().format()}`;

// Compile dist file for browser
module.exports = {
    entry: {
        "bci": "./src/browser.js",
        "bci.min": "./src/browser.js",
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        library: 'bci',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
          include: /\.min\.js$/,
          extractComments: {
            condition: /^\**!|@preserve|@license|@cc_on/i,
            filename: 'LICENSES.txt',
            banner: '\n' + banner + '\n'
          },
        })],
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: banner,
        include: /\.js$/
      }),
    ],
};
