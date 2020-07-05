const unminifiedWebpackPlugin = require('unminified-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
//const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

const HMRPlugin = isDevServer ? new webpack.HotModuleReplacementPlugin() : function(){};

const libraryName = 'ISurf';

module.exports = {
    mode: isDevServer ? 'development' : 'production',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    entry: './index.js',
    output: {
        filename: './bundle.min.js',
        library: libraryName,
        umdNamedDefine: true,
        libraryTarget: 'umd',
        globalObject: 'this',
        pathinfo: false
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js']
    },
    module: {
        /*rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader?cacheDirectory=true',
                //loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]*/
    },
    plugins: [
        /*new UglifyJsPlugin({
            uglifyOptions: {
                mangle: true,
                comments: false,
                compress: {
                    warnings: false,
                    drop_console: true
                }, include: /\.min\.js$/
            }
        }),*/
        new WebpackAutoInject({
            PACKAGE_JSON_PATH: './package.json',
            SHORT: libraryName,
            components: {
                InjectAsComment: true,
                InjectByTag: true
            },
            componentsOptions: {
                InjectAsComment: {
                    tag: 'Build version: {version}'
                }
            }
        }),
        new unminifiedWebpackPlugin(),
        HMRPlugin,
        //new HardSourceWebpackPlugin()
    ]
};