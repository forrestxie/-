/*
* @Author: LENOVO
* @Date:   2018-08-21 19:34:44
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-23 15:21:27
*/
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateIndex  = require('./index.string');
var _cart          = require('service/cart-service.js');
var _product       = require('service/product-service.js');
var _mm            = require('util/mm.js');
var page = {

    data:{
      productId : _mm.getUrlParam('productId') || '',
    },
    init : function(){
        this.bindEvent()
        this.onLoad();
    },
    onLoad : function(){
         if(!this.data.productId){//如果没有传productId,自动跳回首页
             //_mm.goHome();
         }
         this.loadDetail();
    },
    
    bindEvent : function(){
       var _this = this;
       //图片预览
       $(document).on('mouseenter','.p-img-item',function(){
        var imageUrl = $(this).find('.p-img').attr('src');
        $('.main-img').attr('src',imageUrl);
       });
       $(document).on('click', '.p-count-btn',function(){
          var type = $(this).hasClass('plus')? 'plus' : 'minus',
            $pCount = $('.p-count'),
            curCount =parseInt($pCount.val()),
            minCount = 1;
            maxCount =_this.data.detailInfo.stock || 1;
            if(type ==="plus"){
                $pCount.val(curCount < maxCount ? curCount+1 : maxCount);
            }
            else if(type ==='minus'){
             $pCount.val(curCount > minCount ? curCount-1 : minCount);
          
            }
       });
       $(document).on('click', '.cart-add',function(){
               
             _cart.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val()
               },function(res){
                 window.location.href = './result.html?type=cart-add';
               },function(errMsg){
                _mm.errorTips(errMsg);
               }
               )
       })
    },
    loadDetail : function(){//加载详情页的数据
        var _this = this;
        var $pageWrap= $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        var html='';
        _product.getProductDetail(this.data.productId,function(res){
          _this.filter(res);
          //缓存住detail的数据
          _this.data.detailInfo = res;
          html = _mm.renderHtml(templateIndex,res);
          $('.page-wrap').html(html);
        },function(err){
            $pageWrap.html('<p class="err-tip">此商品不见了,请重新选择</p>')
        }
    )},
        filter: function(data){
             data.subImages = data.subImages.split(',');
        }
   
};
$(function(){
  page.init()
})