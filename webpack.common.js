const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: "./src/main.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/i,
                loader: ["style-loader", "css-loader"],
            }
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "request$": "xhr",
        },
        extensions: [ '.tsx', '.ts', '.js'],
    },
    plugins: [
        new FaviconsWebpackPlugin('static/favicon-32x32.png')
    ]
};
