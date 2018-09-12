/*
* @Author: LENOVO
* @Date:   2018-08-16 14:50:11
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-19 17:37:26
*/
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex =require('./index.string');
 //侧边导航
   var navSide = {
     option: {
          name: '',
          navList : [
              {name : 'user-center', desc : '个人中心', href: './user-center.html'},
              {name : 'order-list',  desc : '我的订单', href: './order-list.html'},
              {name : 'pass-update', desc : '修改密码', href: './user-password-update.html'},
              {name : 'about',       desc : '关于我们', href: './about.html'}
          ]
     },
     init : function(option){
       $.extend(this.option, option);//用户传的option和默认option做合并
           this.renderNav();
     },
     renderNav : function(){//渲染导航菜单
       //计算active数据
       for(var i=0, iLength = this.option.navList.length; i<iLength; i++)
       {
        if(this.option.navList[i].name === this.option.name){
            this.option.navList[i].isActive = true;
        }
       };
       var navHtml = _mm.renderHtml(templateIndex, {
        navList : this.option.navList
       });  
       //把Html放入容器
       $('.nav-side').html(navHtml); 
     }
     };
   module.exports= navSide;