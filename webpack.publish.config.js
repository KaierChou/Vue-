/**
 * 生产阶段所有Webpack的配置
 * 
 * 生产阶段的webpack的配置文件其实就是在开发阶段webpack配置的基础上，多增加一些额外的配置
 * 
 */

 //导入根据模版文件生成index.html的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path')

//打包之前删除某个文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')

var webpack = require('webpack')

//抽离css第三方包
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
     //属性名称代表你打包出来的最终的文件名称
     //值，代表你要打包的是哪个第三方包(名称看node_modules中)
    //  vue:['vue'],
    //  vueRouter:['vue-router'],
    //  vuex:['vuex'],
     quanjiatong:['vue','vue-router','vuex'],
     vuePreview:['vue-preview'],
     vueResource:['vue-resource'],
     moment:['moment'],
     mintUI:['mint-ui'],
     bundle:path.join(__dirname,'src/main.js') //打包自己的业务逻辑代码，别忘记了
  }, //打包入口文件
  output: { //输出文件
    path: path.join(__dirname,"dist"),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/, //凡是以.vue结尾的文件使用vue-loader去打包
        loader: 'vue-loader'//兼容1.x和2.x es6--->es5(babel)
      },
      {
        test: /\.css$/, //凡是以.vue结尾的文件使用vue-loader去打包
        // use: [//2.x的写法
        //   {
        //     loader: "style-loader"
        //   },
        //   {
        //     loader: "css-loader"
        //   }
        // ]
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|svg|gif)$/, //凡是以.png,ttf结尾的文件使用vue-loader去打包
        use: [//2.x的写法
          {
            /*limit：
               表示的是一个阀值,如果当前我们资源中的图片大小
               4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js

               name:打包出来的图片，放在那个文件夹下，用什么文件名称命名
               [name]代表你原始的文件名称
               [hash:5] 让浏览器支持图片的缓存
               [ext] 图片本身的拓展名
            */
            loader: "url-loader?limit=4000&name=images/[name]-[hash:5].[ext]"
          }
        ]
      },
      {
        test: /\.(ttf)$/, //凡是以.png,ttf结尾的文件使用vue-loader去打包
        use: [//2.x的写法
          {
            /*limit：
               表示的是一个阀值,如果当前我们资源中的图片大小
               4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js

               name:打包出来的图片，放在那个文件夹下，用什么文件名称命名
               [name]代表你原始的文件名称
               [hash:5] 让浏览器支持图片的缓存
               [ext] 图片本身的拓展名
            */
            loader: "url-loader?limit=4000&name=fonts/[name]-[hash:5].[ext]"
          }
        ]
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
          test: /vue-preview.src.*?js$/,
          loader: 'babel-loader'
      }
    ]
  },
  // externals:{ //外部的，到时候webpack打包之前进行检查，如果发现有      externals并且进行了配置，
  //     //就把这里面东西忽略掉，不进行打包，不打包进入bundle.js
  //     //举例：import Vue from 'vue'
  //     //第一个vue是我们在项目中通过import 导入的包的名称,就是from后面的东西 
  //     //第二个参数就是我们在import后面的对象
  //     "vue":"Vue",
  //     "vue-router":"VueRouter",
  //     "mint-ui":"MINT"
  // },
  plugins: [
    //推荐放在所有插件的最前头
    new CleanWebpackPlugin("dist"),

    new HtmlWebpackPlugin({
      filename: 'index.html', //以参数文件生成的最终的文件名称
      template:'./template.html', //参照文件的路径
      minify: {
        removeComments: true,//去除注释
        collapseWhitespace: true,//去除空格
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),

    //设置当前Vue的环境为生产环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //压缩我们js代码，使用uglify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false //去除警告信息
      },
      comments: false //去掉版权信息等注释
    }),

    //这个地方有个小注意点，不要把自己业务逻辑bundle放在这里，
    //这里只放第三方
    // new webpack.optimize.CommonsChunkPlugin({name:["mintUI","moment","vueResource","vuePreview","vuex","vueRouter","vue"],minChunks: Infinity})
    new webpack.optimize.CommonsChunkPlugin({name:["mintUI","moment","vueResource","vuePreview","quanjiatong"],minChunks: Infinity}),

    //抽离出来的css样式存放在css/style.css中去
    new ExtractTextPlugin("css/style.css")
  ]
}
