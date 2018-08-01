const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const ENV_TEST = 'test';
const isProduction = ENV === 'production';

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        init: [
            './client/normalize.css',
            'core-js/fn/array/from',
            'core-js/fn/array/find',
            'core-js/fn/array/find-index',
            'core-js/fn/array/includes',
            'core-js/fn/map',
            'core-js/fn/object/assign',
            'core-js/fn/object/values',
            'core-js/fn/promise',
            'core-js/fn/set',
            'core-js/fn/string/ends-with',
            'core-js/fn/string/includes',
            'core-js/fn/string/starts-with',
            'core-js/fn/string/trim'
        ],
        app: [
            './client/app'
        ]
    },
    output: {
        path: path.join(__dirname, 'build', 'public'),
        filename: '[name].bundle.js?h=[chunkhash]',
        publicPath: '/public/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ['node_modules'],
        alias: {
            components: path.resolve(__dirname, 'client', 'components'),
            containers: path.resolve(__dirname, 'client', 'containers'),
            utils: path.resolve(__dirname, 'client', 'utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.css?$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'file-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(svg|png|jpg|woff|woff2|eot|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?h=[hash:6]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: isProduction
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({ filename: '[name].css?h=[chunkhash]', allChunks: true }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV)
            }
        }),
        new AssetsPlugin({
            path: path.resolve(__dirname, 'build', 'server'),
            filename: 'assets.json'
        })
    ].concat(ENV !== ENV_TEST ? [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['app'],
            minChunks: ({ context }) => context && context.includes('node_modules')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'init',
            chunks: ['init'],
            minChunks: Infinity
        })
    ] : []).concat(isProduction ? [
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourceMap: false,
            compress: {
                drop_console: true,
                drop_debugger: true,
                unsafe: true,
                warnings: false
            }
        })
    ] : []),
    stats: {
        chunks: false,
        modules: false,
        assets: false,
        version: false
    },
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
    watchOptions: {
        aggregateTimeout: 1000,
        ignored: /node_modules/
    }
};
