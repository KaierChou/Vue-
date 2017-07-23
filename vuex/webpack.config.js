//导入根据模版文件生成index.html的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js', //打包入口文件
  output: { //输出文件
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/, //凡是以.vue结尾的文件使用vue-loader去打包
        loader: 'vue-loader',//兼容1.x和2.x es6--->es5(babel)
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/, //凡是以.vue结尾的文件使用vue-loader去打包
        use: [//2.x的写法
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(png|ttf|svg|gif)$/, //凡是以.png,ttf结尾的文件使用vue-loader去打包
        use: [//2.x的写法
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //以参数文件生成的最终的文件名称
      template:'./template.html' //参照文件的路径
    })
  ]
}
