const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/';
module.exports = {
    entry: ['./src/lib/widget-starter.js'],
    output: {
        publicPath: ASSET_PATH,
        filename: 'index.js',
        path: 'D:/work_dsk/TMC/Cobot2/tmc_automatic_delivery',
        assetModuleFilename: 'assets/images/[name][ext]',
    },
    mode: 'production',
    performance: {
        maxAssetSize: 1000000,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                exclude: [/node_modules/, /src\/assets/],
                loader: 'eslint-loader',
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /src\/assets/],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },

            {
                test: /\.md$/i,
                use: 'raw-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new CssUrlRelativePlugin(/* options */),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: './src/index.html',
                    to: './index.html',
                },
                {
                    from: './src/assets',
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.md'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
};
