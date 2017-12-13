var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var webpack_config = {
  context: __dirname,

  entry: [
    'babel-polyfill',
    './assets/src/index.js',
  ],

  output: { // コンパイルされたファイルの設定
      path: path.resolve('./assets/bundles/'),
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
                'react-hot-loader/babel',
                'transform-class-properties', // class 変数定義を可能にする
                'transform-object-rest-spread', // {...rest} 表記を可能にする
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
      Avatar: ['material-ui/Avatar', 'default'],
      Dialog: ['material-ui/Dialog', 'default'],
      Divider: ['material-ui/Divider', 'default'],
      FontIcon: ['material-ui/FontIcon', 'default'],
      Paper: ['material-ui/Paper', 'default'],
      RaisedButton: ['material-ui/RaisedButton', 'default'],
      Subheader: ['material-ui/Subheader', 'default'],
      TextField: ['material-ui/TextField', 'default'],
      List: ['material-ui/List', 'List'],
      ListItem: ['material-ui/List', 'ListItem'],
      Card: ['material-ui/Card', 'Card'],
      CardActions: ['material-ui/Card', 'CardActions'],
      CardHeader: ['material-ui/Card', 'CardHeader'],
      CardMedia: ['material-ui/Card', 'CardMedia'],
      CardTitle: ['material-ui/Card', 'CardTitle'],
      CardText: ['material-ui/Card', 'CardText'],
      Colors: ['material-ui/styles', 'colors'],
    }),

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

if (process.env.NODE_ENV === 'production') {
  webpack_config.output.filename = '[name]-[hash].js'
  webpack_config.output.publicPath = ''

} else {
  webpack_config.output.filename = "[name].js",
  webpack_config.output.publicPath = 'http://localhost:3000/assets/bundles/'

  webpack_config.entry.unshift(
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  )
  webpack_config.plugins.shift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()  // don't reload if there is an error
  )
}

module.exports = webpack_config
