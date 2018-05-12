var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlBeautifyPlugin  = require('html-beautify-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var pathsToClean = [
    'dist',
    'temp'
]

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        main: './index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './js/[name].js',
        hotUpdateMainFilename: "../temp/[hash].hot-update.json",
        hotUpdateChunkFilename: "../temp/[id].[hash].hot-update.js"
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style",
                    use: [{
                            loader: "css",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass",
                            options: {
                                sourceMap: true,
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                })
            },
            {
                test: /\.pug$/,
                use: [{
                    loader: 'pug'
                }]
            },
            {
                test: /\.jpg$/,
                use: [{
                    loader: "file",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }]
            },
            {
                test: /\.(ttf|woff|svg)$/,
                use: [{
                    loader: "file",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './pug/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'inner.html',
            template: './pug/inner.pug'
        }),
        new HtmlBeautifyPlugin(),
        new ExtractTextPlugin('css/main.css'),
        new WriteFilePlugin(),
        new CleanWebpackPlugin(pathsToClean)
    ],
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        compress: true,
        port: 1337
    }
};