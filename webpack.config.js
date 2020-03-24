var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Set the entry point for webpack. This will eventually get transpiled into bundle.js
  entry: [
    './src/app/app.js',
  ],
  // Set the output location for webpack. Every js file will get transpiled in this file.
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // Plugins to help us bundle our app.
  plugins: [
    // Allows us to use webpack to load html.
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    // Allows webpack to extract css to a seperate file.
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    // Automatically prefixes css with browser-specific prefixes.
    require('autoprefixer'),
  ],
  // Auto-resolves imports with the following extensions. This means we don't have to write .js every time we import.
  resolve: {
    extensions: [
      '.js'
    ]
  },
  module: {
    rules: [
      // Use bable to transpile our js files with modern syntax to browser compatible syntax.
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      // Use the loaders to bundle .scss with webpack.
      {
        test: [/.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      // User a file loader to add files to the bundle.
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images'
            }
          }
        ]
      }
    ]
  }
};
