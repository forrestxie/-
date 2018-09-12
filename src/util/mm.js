/*
* @Author: LENOVO
* @Date:   2018-08-14 21:01:23
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-09-04 21:35:28
*/
'use strict';
var Hogan = require('hogan.js');
var conf = {
  serverHost : ''
};
var _mm={

   request : function(param){//网络请求
    var _this = this;
    $.ajax({
        type     : param.method || 'get',
        url      : param.url    || '',
        dataType : param.type   || 'json',
        data     : param.data   || '',
        success  : function(res){
               //请求成功
              if(0 === res.status){
                typeof param.success === 'function' && param.success(res.data,res.msg);//判断param.success是否函数,是就调用回调函数
              }
              //没有登陆状态, 需要强制登陆
              else if(10 === res.status){
                _this.doLogin()//跳转到登录页面
              }
              else if(1 === res.status){//请求数据错误
                typeof param.error === 'function' && param.error(res.msg);
              }
        },
        error    : function(err){//404,503
           typeof param.error === 'function' && param.error(err.statusText);
        }
    });
   },
   getServerUrl : function(path){//获取服务器地址
           return conf.serverHost + path;//可添加,方便修改地址
   },
   getUrlParam : function(name){//获取url的参数, happymmall.com/product/list?keyword=xxx&page=1
       var reg = new RegExp('(^|&)'+name + '=([^&]*)(&|$)');//匹配一个key=value的形式, 它前面可能是空^或者是&,+ name (匹配的词) + 后面为 = ,[^&]非&符就匹配多个*,以&或者字符串末尾(&|$)结束
       var result = window.location.search.substr(1).match(reg);//window.location.search.substr(1),去掉了问号
       return result ? decodeURIComponent(result[2]) : null;
   },
   renderHtml : function(htmlTemplate,data){//渲染html模版
          var template = Hogan.compile(htmlTemplate),
              result   = template.render(data);
              return result;
   },
    successTips : function(res){//成功提示
       alert(res);
       },
       errorTips: function(msg){
        alert(msg);
       },
       validate : function(value, type){//字段验证,支持非空、手机、邮箱
        var value = $.trim(value);
        if('require' === type){//非空验证
            return !!value;//把value强制转化为boolean类型
        } 
        if('phone' === type){//手机号验证
            return /^1\d{10}$/.test(value);
        }
       if('email' === type){//邮箱验证
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
        }
       },
    goHome : function(){//跳转方法
      window.location.href = './index.html';
    },
   doLogin : function(){//统一的登陆处理
    window.location.href = './user-login.html?redirect=' + encodeURIComponent (window.location.href);//如果window.location.href有特殊字符,可能出现截断,所以要encodeURIComponent编码
   }
}

module.exports = _mm