/*
* @Author: LENOVO
* @Date:   2018-08-27 19:14:48
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-27 19:56:12
*/
var _mm = require('util/mm.js');

var _payment = {
    // 获取支付信息

    getPaymentInfo     : function(orderNumber, resolve, reject){

        _mm.request({
            url       : _mm.getServerUrl('/order/pay.do'),
            data      : {
                 orderNo :  orderNumber//后端用orderNo,service可以对请求做一下过滤
            },
            success   : resolve,
            error     : reject
        });
    },
    //获取订单状态
     getPaymentStatus : function(orderNumber, resolve, reject){

        _mm.request({
            url       : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data      : {
                 orderNo :  orderNumber//后端用orderNo,service可以对请求做一下过滤
            },
            success   : resolve,
            error     : reject
        });
    },
   
   
}
module.exports = _payment;