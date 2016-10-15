const webpack = require('webpack');
const path = require('path');

const filename = 'bundle.js';

module.exports = {
  entry: './render.jsx',

  output: {
    path: path.join(__dirname, 'static', 'js', 'dist'),
    filename,
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
