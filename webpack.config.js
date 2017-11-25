var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',

    'babel-polyfill',
    'react-hot-loader/patch',
    './assets/src/index.js',
  ],

  output: { // コンパイルされたファイルの設定
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
      publicPath: 'http://localhost:3000/assets/bundles/'
  },

  module: {
    // import, load関連設定
    rules: [
      // jsファイル import設定
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options:  {
              cacheDirectory: true,
              plugins: [
                'react-hot-loader/babel'
              ],
              presets: ['react', 'es2015']
            }
          },
        ]
      },

      // cssファイル import
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },

      // svg
      {
        test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      },
    ]
  },

  plugins: [
    // django連携用にwebpackビルド情報を出力
    new BundleTracker({filename: './webpack-stats.json'}),

    // 全js内にimportを暗黙定義
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Dialog: 'material-ui/Dialog',
      Divider: 'material-ui/Divider',
      FontIcon: 'material-ui/FontIcon',
      Paper: 'material-ui/Paper',
      RaisedButton: 'material-ui/RaisedButton',
      Subheader: 'material-ui/Subheader',
      TextField: 'material-ui/TextField',
      List: ['material-ui/List', 'List'],
      ListItem: ['material-ui/List', 'ListItem'],
      Colors: 'material-ui/styles/colors',
    }),

    // local
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),  // don't reload if there is an error
  ],

  // webpack-dev-server向け設定
  devServer: {
    //colors: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: 3000,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  devtool: 'cheap-module-eval-source-map',
}
