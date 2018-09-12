'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _payment          = require('service/payment-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        // 加载detail数据
        this.loadpaymentInfo();
    },
    
    // 加载订单列表
    loadpaymentInfo: function(){
        var _this           = this,
            paymentHtml     = '',
            $pageWrap        = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
          _this.listenOrderStatus();
        _payment.getPaymentInfo(_this.data.orderNumber, function(res){
            
            // 渲染html
             paymentHtml    = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
   listenOrderStatus : function(){//监听订单状态
          var _this = this;
          this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if(res == true){
                    window.location.href = './result.html?type=payment&orderNumber='+ _this.data.orderNumber;
                }
            },function(errMsg){

            })
          },5000)
   },
    
};
$(function(){
    page.init();
});