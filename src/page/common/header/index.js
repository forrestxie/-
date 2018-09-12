/*
* @Author: LENOVO
* @Date:   2018-08-16 13:45:24
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-20 20:27:36
*/
require('./index.css');
var _mm = require('util/mm.js');
 
   var header = {//通用页面头部
     init : function(){
           this.bindEvent();
           this.onLoad();
     },
     onLoad : function(){
         var keyword = _mm.getUrlParam('keyword');
         if(keyword){//keyword存在,则回填输入框
            $('#search-input').val(keyword);
         };
     },
     bindEvent : function(){
          _this = this;
          $('#search-btn').click(function(){//点击搜索按钮以后,做搜索提交
            
            _this.searchSubmit();

          });
          $('#search-input').keyup(function(e){
            if(e.keyCode == 13){
                _this.searchSubmit();
            }
          })
          },
     searchSubmit : function(){//搜索的提交
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
             } 
         else{//如果keyword为空,直接返回首页
            _mm.goHome();
         }    
     }
     };
   header.init();