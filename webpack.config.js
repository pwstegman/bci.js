const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

// Compile dist file for browser
module.exports = {
    entry: './index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bci.min.js',
        library: 'bci',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    performance: {
        hints: false
    }
};
