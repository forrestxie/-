'use strict';
require('./index.css')
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./index.string');
navSide.init({
    name : 'user-center'
})
 require('util/sliders/index.js');
 $(function() {
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
   var $slider= $('.banner').unslider({
        dots: true
    });
    //前一张和后一张的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev')?'prev':'next';
        $slider.data('unslider')[forward]();
    })
});