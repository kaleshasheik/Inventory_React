const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

var config = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    externals: {
        jquery: 'jQuery'
    },
    performance: {
        hints: 'warning'
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, use: 'ts-loader' },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                   
                ],
               
            },
            {
                test: /\.css$/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      modules: true, // default is false
                      sourceMap: true,
                      importLoaders: 1,
                      localIdentName: "[name]--[local]--[hash:base64:8]"
                    }
                  },
                  "postcss-loader"
                ]
              },
          
              {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                  {
                    loader: "url-loader"
                  }
                ]
              },
            {
                type: "javascript/auto",
                test: /\.json$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "./translations/[name].[ext]"
                    }
                  }
                ]
              },
              {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      outputPath: "fonts/"
                    }
                  }
                ]
              }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        hot: true
      },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: './index.html' }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
     /*  new ForkTsCheckerWebpackPlugin({
            tslint: path.resolve(process.cwd(), 'tslint.json')
        }),
        new webpack.HotModuleReplacementPlugin()*/
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'eval-source-map';
    }

    if (argv.mode === 'production') {
        //...
    }

    return config;
};
