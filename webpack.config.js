const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './app/src/main.js')
    },

    output: {
        path: path.resolve(__dirname, '../admin'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './app/src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './app/api/'),
                    to: path.resolve(__dirname, '../admin/api')
                },
                {
                    from: path.resolve(__dirname, './app/backups/'),
                    to: path.resolve(__dirname, '../admin/backups')
                },
                {
                    from: path.resolve(__dirname, './app/assets/'),
                    to: path.resolve(__dirname, '../admin/assets')
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}