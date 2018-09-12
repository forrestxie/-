/*
* @Author: LENOVO
* @Date:   2018-08-13 21:26:58
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-17 23:21:54
*/
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
require('./index.css');
require('page/common/nav-simple/index.js');

var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
       $('#submit').click(function(){
       
        _this.submit();
       })
       $('.user-content').keyup(function(e){//
        if(e.keyCode===13){
            _this.submit();
        }
        
       })
    },
    //提交表单
    submit:function(){
       var formData = {
        username: $.trim($('#username').val()),
        password: $.trim($('#password').val())
       },
         vaildateResult = this.formValidate(formData);//表单验证结果返回值
         if(vaildateResult.status){
            _user.login(formData,function(res){
                 window.location.href = _mm.getUrlParam('redirect')||'./index.html'
            },function(errMsg){
                  formError.show(errMsg);
            })//提交,发送ajax请求
         }else {//验证失败
            
             formError.show(vaildateResult.msg);
         }
    },
    //表单字段验证
    formValidate : function(formData){
         var result = {
            status : false,
            msg    : ''
         };
         if(!_mm.validate(formData.username,'require')){

            result.msg = '用户名不为空';
            return result;
         }
         if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不为空';
            return result;
         }
         //通过验证,返回正确提示
         result.status = true;
         result.msg = '验证通过';
         return result;
    }
}
page.init();