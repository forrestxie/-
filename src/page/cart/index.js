/*
* @Author: LENOVO
* @Date:   2018-08-23 22:36:31
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-25 20:24:03
*/
/*
* @Author: LENOVO
* @Date:   2018-08-21 19:34:44
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-23 15:21:27
*/
require('./index.css')
var nav = require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateIndex  = require('./index.string');
var _cart          = require('service/cart-service.js');
var _mm            = require('util/mm.js');
var page = {

    data:{
     
     },
    init : function(){
        this.bindEvent()
        this.onLoad();
    },
    onLoad : function(){
        
         this.loadCart();
    },
    
    bindEvent : function(){
       var _this = this;
       //商品的选择和取消选择
       $(document).on('click','.cart-select',function(){
        var $this = $(this);
           ProductId = $this.parents('.cart-table').data('product-id');//parents才是沿着元素的祖宗一直网上找
            
          //切换选中状态
          if($this.is(':checked'))
          {
           
               _cart.selectProduct(ProductId,function(res){//获取购物车列表
                    _this.renderCart(res);
                    },function(errMsg){
                   $('.page-wrap').html('<p class="哪里不对了哩~~~"></p>')
        });
          }
         //取消选中
          else{
               _cart.unselectProduct(ProductId,function(res){//获取购物车列表
                    _this.renderCart(res);
                    },function(errMsg){
                   $('.page-wrap').html('<p class="哪里不对了哩~~~"></p>')
        });
          }
       });
       //商品的全选和取消全选
       $(document).on('click','.cart-select-all',function(){
        var $this = $(this);
           //全选状态
          if($this.is(':checked'))
          {
             _cart.selectAllProduct(function(res){//获取购物车列表
                    _this.renderCart(res);
                    },function(errMsg){
                   $('.page-wrap').html('<p class="哪里不对了哩~~~"></p>')
        });
               
          }
         //取消全选
          else{
               _cart.unselectAllProduct(function(res){//获取购物车列表
                    _this.renderCart(res);
                    },function(errMsg){
                   $('.page-wrap').html('<p class="哪里不对了哩~~~"></p>')
        });
          }
       });
         //商品数量的变化
         $(document).on('click','.count-btn',function(){
          
          var $this = $(this),
              $pCount = $this.siblings('.count-input'),
              currCount = parseInt($pCount.val()),
              type = $this.hasClass('plus') ? 'plus' : 'minus',
              ProductId =  $this.parents('.cart-table').data('product-id'),
              minCount = 1,
              maxCount = parseInt($pCount.data('max')),
              newCount = 0;
              if(type ==='plus'){
                if(currCount>=maxCount){
                  _mm.errorTips('该商品数量已经达到上限');
                  return;
                }
                newCount = currCount +1;
              }else if(type ==='minus'){
                   if(currCount <=minCount){
                    return;
                   }
                   newCount = currCount - 1;
              }
             var cartInfo ={//更新购物车的商品数量
                productId : ProductId,
                count : newCount
              };
              
              _cart.updateProduct(cartInfo, function(res){//获取购物车列表
                     _this.renderCart(res);
                    },function(errMsg){
                   $('.page-wrap').html('<p class="哪里不对了哩~~~"></p>')
        });
         });
         $(document).on('click','.cart-delete', function(){
          if(window.confirm('确认删除该商品?')){
            var productId = $(this).parents('.cart-table').data('product-id')
            _this.deletecartProduct(productId);
          }

         });
        $(document).on('click','.delete-selected', function(){
          if(window.confirm('确认删除选中的商品?')){
            var arrProductIds = [],
          /*  var   $selectedItem = $(.cart-select:checked);*/
                   $selectedItem = $('.cart-select:checked');
                for(var i = 0, iLength = $selectedItem.length;i<iLength ; i++){
                  //循环查找选中的product
                  arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'))
                }
                if(arrProductIds.length){

                  _this.deletecartProduct(arrProductIds.join(','));

                }
                else{
                  _mm.errorTips('您还没有选中商品');
                }
                
            
          }

         }) ;
        $(document).on('click', '.btn-submit', function(){
            //判断总价大于0,就进行提交
             
            if(_this.data.cartInfo&&_this.data.cartInfo.cartTotalPrice>0){
              window.location.href = './order-confirm.html';
            }else{
              _mm.errorTips('请选择商品后再提交');

            }
        })
    },
    renderCart : function(data){
         this.filter(data);
         //缓存购物车信息
         this.data.cartInfo = data;
         //生成HTML
         var cartHtml = _mm.renderHtml(templateIndex,data);
         $(".page-wrap").html(cartHtml);
         //通知购物车导航更新
          nav.loadCartCount();
          
    },
    loadCart : function(){//加载详情页的数据
        var _this = this;
        _cart.getCartList(function(res){//获取购物车列表
             _this.renderCart(res);
        },function(errMsg){
             $('.page-wrap').html('<p class="哪里不对了哩~~~"></p>')
        })
       // $pageWrap.html('<div class="loading"></div>');
       },
       //删除指定商品
       deletecartProduct : function(productIds){
            var _this = this;
            _cart.deleteProduct(productIds,function(res){//获取购物车列表
             _this.renderCart(res);
        },function(errMsg){
             $('.page-wrap').html('<p class="哪里不对了哩~~~"></p>')
        })
       },
       filter : function(data){
         data.notEmpty = !!data.cartProductVoList.length;
       }
};
$(function(){
  page.init()
})