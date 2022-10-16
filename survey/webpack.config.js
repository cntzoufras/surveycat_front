const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
// const outputPath = path.join(__dirname, "dist");
const extractSass = new ExtractTextPlugin({
  filename: "assets/css/[name].[hash].css",
  disable: process.env.NODE_ENV === "development",
});
module.exports = {
  // mode: 'production',
  entry: { app: "./src/index.js" },
  output: {
    filename: "assets/js/[name].[hash].js",
    publicPath: "/",
    // publicPath: '/your/directory/location/' //specify you directory or sub directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path]/[name].[ext]",
              outputPath: "./assets/img/",
              context: "src/assets/img/",
              esModule: false,
            },
          },
          {
            loader: "image-webpack-loader",
            // options: {
            //   mozjpeg: {
            //     progressive: true,
            //     quality: 70,
            //   },
            //   // optipng.enabled: false will disable optipng
            //   optipng: {
            //     enabled: false,
            //   },
            //   pngquant: {
            //     quality: [0.7, 0.9],
            //     speed: 4,
            //   },
            //   gifsicle: {
            //     interlaced: false,
            //   },
            //   // the webp option will enable WEBP
            //   webp: {
            //     quality: 75,
            //   },
            // },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader",
        options: {
          name: "./[name].[ext]",
          outputPath: "./assets/fonts/",
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
          // use style-loader in development
          fallback: "style-loader",
        }),
      },
      {
        test: /\.css$/,
        use: extractSass.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    extractSass,
    // new ExtractTextPlugin('[name].[hash].css'),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
};
