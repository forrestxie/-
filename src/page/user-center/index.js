/*
* @Author: LENOVO
* @Date:   2018-08-19 09:53:31
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-19 12:00:08
*/
require('./index.css')
var _mm = require('util/mm.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');
var page = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){

        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();//加载用户信息
    },
    loadUserInfo : function(){//加载用户信息
        var userHtml = '';
       
         _user.getUserInfo(function(res){
           userHtml = _mm.renderHtml(templateIndex, res);
           $('.panel-body').html(userHtml);
         },function(err){
            console.log(err)
         })
    }
}
page.init();