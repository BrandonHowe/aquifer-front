const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const path = require("path");

module.exports = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'aquifer.bundle.dev.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 2400
    },
    mode: "development",
    watch: true,
});
