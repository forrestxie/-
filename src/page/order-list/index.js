/*
* @Author: LENOVO
* @Date:   2018-08-27 11:41:34
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-27 14:44:39
*/
require('./index.css')
var _mm = require('util/mm.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var Pagination      = require('util/pagination/index.js');
var navSide = require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');
var page = {
    data : {
       listParam : {
        pageNum : 1,
        pageSize: 6
       }
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        navSide.init({
            name: 'order-list'
        });
    },
    //加载订单列表
    loadOrderList : function(){
        var orderListHtml = "",
           _this = this,
           $listCon = $('.order-list-con');
           _order.getOrderList(this.data.listParam, function(res){
                orderListHtml = _mm.renderHtml(templateIndex,res);
                $listCon.html(orderListHtml);
                _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
           },function(errMsg){
              $listCon.html('<p class="err-tip">加载订单失败,请刷新后重试</p>')
           }
           );
    
    },
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
    

}
page.init();