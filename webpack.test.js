// const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      // { test: /\.css$/, loader: "style!raw" },
      // { test: /\.css$/, loader: "style!css" },
      // { test: /\.css$/, loader: "style/url!file" },
      { test: /\.ts$/,  loader: 'awesome-typescript-loader' }
    ]
  },
  plugins: [
    // new ForkCheckerPlugin(),
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html',
    //   chunksSortMode: 'dependency'
    // })
  ]
};
