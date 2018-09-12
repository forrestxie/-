/*
* @Author: LENOVO
* @Date:   2018-08-19 10:05:59
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-19 17:27:12
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
        this.bindEvent();
    },
    bindEvent : function(){
        //点击提交按钮后的动作
        _this = this;
       $(document).on('click','.btn-submit',function(){

        var userInfo = {
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
         question : $.trim($('#question').val()),
           answer : $.trim($('#answer').val())            
        };
      var  validateResult = _this.validateForm(userInfo);
           
        if(validateResult.status){
            //更改用户信息
            _user.updateUserInfo(userInfo, function(res,msg){
                        
                   _mm.successTips(msg);
                   window.location.href = './user-center.html';
            },function(errMsg){
                
                _mm.errorTips(errMsg);
            });
        }
        else{
            
            _mm.errorTips(validateResult.msg);
        }
       }) 
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
    },
    validateForm : function(formData){
            var result = {
            status : false,
            msg    : ''
         };
         
         //验证格式
          if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机格式不正确';
            return result;
         } 
          if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
         } 
         if(!_mm.validate(formData.question,'require')){
            result.msg = '问题不能为空';
            return result;
         } 
         if(!_mm.validate(formData.answer,'require')){
            result.msg = '答案不能为空';
            return result;
         } 
         //通过验证,返回正确提示
         result.status = true;
         result.msg = '验证通过';
         return result;
    }

}
page.init();