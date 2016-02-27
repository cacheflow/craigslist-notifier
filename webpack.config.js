var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './query.js',
  output: {
    filename: './bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
    ],
    resolveLoader: {
      packageMains: ['json-loader']
    }
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    path: true
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.ProvidePlugin({
      'React': 'react',
      '$': 'jQuery'
    })
  ]
};
