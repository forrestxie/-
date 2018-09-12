/*
* @Author: LENOVO
* @Date:   2018-08-13 16:19:03
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-09-04 21:35:23
*/
var webpack           = require('webpack') ;
var Ex                = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//获取HtmlWebpackPlugin插件的参数
var WEBPACK_ENV      = process.env.WEBPACK_ENV||'dev';//环境变量的配置, dev/online
var getHtmlConfig = function(name,title){//对应的js加载到对应的html中
    return {
            template : './src/view/' + name + '.html',
            filename : 'view/'+ name +'.html',
            title    : title,
            inject   : true,
            hash     : true,
            chunks   : ['common', name]
    }
}
var config = {
    entry: {
        'common'                : ['./src/page/common/index.js'],
        'list'                  : ['./src/page/list/index.js'],
        'detail'                : ['./src/page/detail/index.js'],
        'cart'                  : ['./src/page/cart/index.js'],
        'index'                 : ['./src/page/index/index.js'],
        'user-login'            : ['./src/page/user-login/index.js'],     
        'user-register'         : ['./src/page/user-register/index.js'],     
        'result'                : ['./src/page/result/index.js'],    
        'order-confirm'         : ['./src/page/order-confirm/index.js'],    
        'order-list'            : ['./src/page/order-list/index.js'],    
        'order-detail'          : ['./src/page/order-detail/index.js'],    
        'payment'               : ['./src/page/payment/index.js'],    
        'user-passreset'        : ['./src/page/user-passreset/index.js'],    
        'user-center'           : ['./src/page/user-center/index.js'],    
        'user-center-update'    : ['./src/page/user-center-update/index.js'],    
        'user-password-update'  : ['./src/page/user-password-update/index.js'],    
    },
    output:{
         path: './dist',
         publicPath: '/dist',//这句是为了解决webpack-service-dev没有渲染页面的问题
         filename:'js/[name].js'
    },
    externals : {
        'jquery': 'window.jQuery'//直接外部引入cdn的jquery时,使用require模块开发要用 externals
    },
    module: {
        loaders:[
              {test:/\.css$/,loader: Ex.extract('style-loader', 'css-loader','less-loader') },
                // 单独打包出CSS，这里配置注意下
              {test:/\.(jpg|png|gif|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?limit=8192&name=resource/[name].[ext]'},
              {test:/\.string$/, loader:'html-loader'}

  
        ]
    },
     resolve: {
        alias : {
            util           : __dirname + '/src/util',
            page           : __dirname + '/src/page',
            service        : __dirname + '/src/service',
            image          : __dirname + '/src/image',
            node_modules   : __dirname + '/node_modules',
        }
     },
    plugins: [
     new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
     new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登陆')),
     new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
     new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
     new HtmlWebpackPlugin(getHtmlConfig('cart','商品购物车')),
     new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
     new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
     new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付')),
     new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
     new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
     new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
      new HtmlWebpackPlugin(getHtmlConfig('user-passreset','找回密码')),
      new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
      new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
      new HtmlWebpackPlugin(getHtmlConfig('user-password-update','修改密码')),
    
      new webpack.optimize.CommonsChunkPlugin({
            name: 'common',//可以直接定义公共模块, 每一个页面都有用到,但不用每一个都require一遍
            filename: 'js/base.js'
        }),//webpack提取公共模块的: CommonsChunkPlugin
     new Ex("css/[name].css")//css单独打包工具, 如果没有css会被打包在js,需要js执行完才加载css,同时loader的地方也要改一下
    ]
};
if('dev'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;