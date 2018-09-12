/*
* @Author: LENOVO
* @Date:   2018-08-19 17:29:04
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-19 20:15:30
*/
require('./index.css')
var _mm = require('util/mm.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
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
            origin_password : $.trim($('#origin-password').val()),
            new_password : 123123
            
               
        };
      var  validateResult = _this.validateForm(userInfo);
           
        if(validateResult.status){
            //更改用户信息
             
            _user.checkPassword(userInfo, function(res,msg){
                  $('#new-item').show();
                  $('#origin-item').hide();      
                  validateResult.new_st = true;
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
            name: 'pass-update'
        });
        
    },
  
    validateForm : function(formData){
            var result = {
            status : false,
            msg    : '',
            new_st :false
         };
         
         //验证格式
           
        
         if((result.new_st==false) && !_mm.validate(formData.origin_password,'require'))
            {
                result.msg = '密码不为空';
                alert(result.new_st)
                return result;
         } 
       if (result.new_st){
         if(!_mm.validate(formData.new_password,'require')){
            result.msg = '密码不为空';
            return result;
         } 
         if(formData.origin_password.length<6){
            result.msg = '密码长度不能小于6位';
            return result;
         }
     }
         //通过验证,返回正确提示
         result.status = true;
         result.msg = '验证通过';
         return result;
    }

}
page.init();