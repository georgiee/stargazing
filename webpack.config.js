const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path');

const devPlugins = [
  new HTMLWebpackPlugin({
    inject: true,
    chunks: ['presentation'],
    filename: 'index.html',
    template: 'src/presentation/index.html',
  }),

  new HTMLWebpackPlugin({
    inject: true,
    chunks: ['playground'],
    filename: 'playground.html',
    template: 'src/playground/index.html',
  })
]

const plugins = [
  new VueLoaderPlugin(),
  ...devPlugins,
  new CopyWebpackPlugin([ { from: 'examples/**/*', to: '' }]),
  new CopyWebpackPlugin([ { from: 'static', to: 'static' }])
];

module.exports = {
  entry: {
    'presentation': './src/presentation/main.ts',
    'playground': './src/playground/main.ts'
  },
  mode: 'development',
  optimization: {
    minimize: true
  },
  devServer: {
    contentBase: './static'
  },
  output: {
    filename: "[name]/bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".vue"]
  }
};