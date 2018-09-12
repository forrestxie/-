/*
* @Author: LENOVO
* @Date:   2018-08-16 16:12:39
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-18 23:43:34
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
$(function(){
    var type = _mm.getUrlParam('type')||'default',
    $element = $('.'+ type+'-success').show();//显示对应的提示元素
})//哪一个操作成功显示对应的页面
