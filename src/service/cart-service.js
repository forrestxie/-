/*
* @Author: LENOVO
* @Date:   2018-08-15 23:05:09
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-24 21:11:49
*/
var _mm = require('util/mm.js');
var _cart =　{
    //获取购物车数量
    
   getCartCount　: function(resolve, reject){//退出
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error　: reject
        });
    },
    getCartList : function(resolve, reject){
           _mm.request({
            url : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error　: reject
        });
    },
    addToCart　: function(productInfo,resolve, reject){//退出
        _mm.request({
            url : _mm.getServerUrl('/cart/add.do'),
            data : productInfo,
            success : resolve,
            error　: reject
        });
    },

//选择购物车商品
selectProduct :function(productId, resolve, reject){//退出
        _mm.request({
            url : _mm.getServerUrl('/cart/select.do'),
            data: {
                productId : productId
            },
            success : resolve,
            error　: reject
        });
    } ,
   unselectProduct :function(productId, resolve, reject){//退出
        _mm.request({
            url : _mm.getServerUrl('/cart/un_select.do'),
            data: {
                productId : productId
            },
            success : resolve,
            error　: reject
        });
    },
    //取消选择全部商品
    unselectAllProduct :function(resolve, reject){//退出
        _mm.request({
            url : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error　: reject
        });
    },
    selectAllProduct : function(resolve, reject){//退出
        _mm.request({
            url : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error　: reject
        });
    }  ,
    //更新购物车中商品数量
    updateProduct : function(productInfo, resolve, reject){//退出
                
        _mm.request({
            url : _mm.getServerUrl('/cart/update.do'),
            data: productInfo,
            success : resolve,
            error　: reject
        });
    },
    //删除指定商品
    deleteProduct : function(productIds, resolve, reject){//退出
    
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds : productIds
            },
            success : resolve,
            error　: reject
        });
    }
}
module.exports =_cart;