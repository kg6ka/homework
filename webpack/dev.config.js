const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'bootstrap-loader',
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        publicPath: '/dist/',
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass',
            },
            {
                test: /\.css$/,
                loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url?limit=25000',
            },
            {
                test: /\.(svg|woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000',
            }
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
            __DEVELOPMENT__: true,
        }),
        new ExtractTextPlugin('bundle.css'),
        new ExtractTextPlugin({
            filename: '../src/styles/style.css',
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
        }),
    ],
};