const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const devPlugins = [
  new HTMLWebpackPlugin({
    inject: true,
    chunks: ['presentation'],
    filename: 'index.html',
    template: 'src/presentation/index.html',
  })
]

const plugins = [
  ...devPlugins,
  new CopyWebpackPlugin([ { from: 'examples/**/*', to: '' }]),
  new CopyWebpackPlugin([ { from: 'static', to: 'static' }])
];

module.exports = {
  entry: {
    'presentation': './src/presentation/main.ts'
  },
  mode: 'development',
  optimization: {
    minimize: true
  },
  devServer: {
    contentBase: './'
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
        exclude: /node_modules/
      },
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
    extensions: [".ts", ".tsx", ".js"]
  }
};
