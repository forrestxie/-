/*
* @Author: LENOVO
* @Date:   2018-08-15 22:34:14
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-19 20:12:16
*/
var _mm = require('util/mm.js');
var _user =　{
    //检查登陆状态

    checkLogin : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error　: reject
        })
    },
    login : function(userInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/login.do'),
            data: userInfo,
            method : 'POST',
            success : resolve,
            error　: reject
        })
    },
    getQuestion : function(username, resolve, reject){//获取用户密码问题
            _mm.request({
            url : _mm.getServerUrl('/user/forget_get_question.do'),
            data: {
            username: username
        },
            method : 'POST',
            success : resolve,
            error　: reject
        })
    },
    //检查用户名
   checkUsername : function(username, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/check_valid.do'),
            data: {
                   type :'username',
                   str  : username
            },
            method : 'POST',
            success : resolve,
            error　: reject
        })
    }, 
    //用户注册
    register : function(userInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/register.do'),
            data: userInfo,
            method : 'POST',
            success : resolve,
            error　: reject
        })
    },
    checkAnswer : function(userInfo, resolve, reject){//检测密码提示问题答案
        _mm.request({
            url : _mm.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method : 'POST',
            success : resolve,
            error　: reject
        })
    },
    updateUserInfo :  function(userInfo, resolve, reject){//获取用户信息
        _mm.request({
            url : _mm.getServerUrl('/user/update_information.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error　: reject
        })
    },
    getUserInfo :  function(resolve, reject){//获取用户信息
        _mm.request({
            url : _mm.getServerUrl('/user/get_information.do'),
            method : 'POST',
            success : resolve,
            error　: reject
        })
    },
     resetPassword : function(userInfo, resolve, reject){//重置密码
           _mm.request({  
            url : _mm.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method : 'POST',
            success : resolve,
            error　: reject
        })
    }, 
    checkPassword : function(password, resolve, reject){//重置密码
           _mm.request({  
            url : _mm.getServerUrl('/user/reset_password.do'),
            data: password,
            method : 'POST',
            success : resolve,
            error　: reject
        })
    },
    logout　: function(resolve, reject){//退出
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error　: reject
        })
    }
}
module.exports = _user;