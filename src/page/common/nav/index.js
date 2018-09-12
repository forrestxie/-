/*
* @Author: LENOVO
* @Date:   2018-08-15 22:00:12
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-28 20:05:22
*/
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
   var nav = {
     init : function(){
           this.bindEvent();
           this.loadUserInfo();//一加载页面就调用loadUserInfo来判断是否处于登陆状态
           this.loadCartCount();
           return this;
     },
     bindEvent : function(){
           //登录点击事件
           $('.js-login').click(function(){
              _mm.doLogin();
           });
           //注册点击事件
           $('.js-register').click(function(){
              window.location.href = './register.html';//跳转页面
           });
           //退出点击事件
           $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMSG){
                _mm.errorTips(errMSG);
            })
           })

     },
     loadUserInfo : function(){//加载用户信息
           _user.checkLogin(
            function(res){
                $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
                
            },
            function(errMSG){
               
            });
     },
     loadCartCount : function(){//加载购物车数量
            _cart.getCartCount(function(res){
              
                $('.cart-count').text(res || 0)
            },
            function(errMSG){
                $('.cart-count').text(0)
            })
                 
            
     }
    }
   module.exports= nav.init();