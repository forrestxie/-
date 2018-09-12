/*
* @Author: LENOVO
* @Date:   2018-08-18 14:30:12
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-18 23:36:53
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
    data : {
        username : '',
        question : '',
        answer : '',
        token : ''
        
    },
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload: function(){
        this.loadStepUsername()
    },
    bindEvent: function(){
        var _this = this;
        //验证username

        
       $('#submit-username').click(function(){
           var username =$.trim($('#username').val()) ;
           
         if(username){//用户名存在
            _user.getQuestion(username,function(res){
                  _this.data.username = username;
                  _this.data.question = res;
                  _this.loadStepQuestion();
            },function(errMsg){
                formError.show(errMsg);
            })
         }
          else{  //用户名不存在
                 formError.show('请输入用户名')
          }
       }); 
       $('#submitquestion').click(function(){
           var answer =$.trim($('#answer').val()) ;
          
         if(answer)
         {//用户名存在
          _user.checkAnswer({
             username : _this.data.username,
             question : _this.data.question,
             answer   : answer
              },function(res){
               _this.data.answer = answer;
               _this.data.token  = res;
               _this.loadStepPassword();
             },
            function(errMsg){
                formError.show(errMsg);
            });
         }
          else{  //用户名不存在
                 formError.show('请输入用户名')
          }
       });
       $('#submit-password').click(function(){//输入新密码后
           var password =$.trim($('#password').val()) ;
          
         if(password &&password.length>=6)
         {//密码不为空
          _user.resetPassword({
             username      : _this.data.username,
             passwordNew   : password,
             forgetToken   : _this.data.token
              },function(res){
               window.location.href = './result.html?type=password-reset';
             },
            function(errMsg){
                formError.show(errMsg);
            });
         }
          else{  //密码为空
                 formError.show('请输入不少于6位新的密码')
          }
       });
       
    },
   loadStepUsername : function(){//加载输入用户名的一步
      $('.step-username').show();
   },
   loadStepQuestion : function(){//请求问题验证
      formError.hide();//清除错误提示
      $('.step-username').hide();
     $('.step-username').siblings('.step-question').show().find('.question').text(this.data.question);
   },
   loadStepPassword : function(){//加载输入用户名的一步
      $('.step-question').hide();
     $('.step-question').siblings('.step-password').show()
   }
   
}
    page.init();

