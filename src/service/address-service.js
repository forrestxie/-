/*
* @Author: LENOVO
* @Date:   2018-08-25 20:08:04
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-26 20:13:13
*/
var _mm = require('util/mm.js');

var _address = {
    // 获取地址列表
    getAddressList : function( resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
           data     :{
            pageSize : 50
           },
            success : resolve,
            error   : reject
        });
    },
    //新建收件人
    save : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取单条地址信息
    getAddress : function(shippingId, resolve, reject){
         _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId  : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    update   : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
     //删除收件人
     deleteAddress  : function(id, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
               shippingId : id
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _address;