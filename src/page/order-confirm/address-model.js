/*
* @Author: LENOVO
* @Date:   2018-08-26 12:04:35
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-08-27 13:13:50
*/
require('./index.css');



var _mm            = require('util/mm.js');
var _address           = require('service/address-service.js');
var templateAddressModel = require('./address-model.string');
var _cities = require('util/cities/index.js');
var addressModel = {
   show : function(option){

       this.option = option;
       this.$modelWrap = $('.model-wrap') 
       this.option.data = option.data || {};
       //渲染页面
       this.loadModel();
       this.bindEvent()
   },
   hide : function(){
      this.$modelWrap.empty();
   },
   bindEvent : function(){
    var _this = this;

    //省份和城市的二级联动
     this.$modelWrap.find('#receiver-province').change(function(){
        var selectedProvice =$.trim($(this).val()) ;//字符串的默认最后有空格,需要去掉
         _this.loadCities(selectedProvice);

     });
       //提交收货地址
      this.$modelWrap.find('.address-btn').click(function(){
            
        var receiverInfo = _this.getReceiverInfo(),
            isUpdate     = _this.option.isUpdate;
             
            //使用新地址且验证通过
          if(!isUpdate && receiverInfo.status){
             _address.save(receiverInfo.data, function(res){
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' 
                        && _this.option.onSuccess(res);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
          }
          else if(isUpdate&&receiverInfo.status){

          }
          else{
            _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了~~')
          }
     });
     //阻止内容区的冒泡
       this.$modelWrap.find('.model-container').click(function(e){
            e.stopPropagation();
     });
      this.$modelWrap.find('.close').click(function(){
        _this.hide();
     });
   },
   
   //这是获取表单中收件人信息,并做表单的验证
   getReceiverInfo : function(){
      var receiverInfo = {},
      result  = {
        status  : false
      };
      receiverInfo.receiverName     = $.trim(this.$modelWrap.find('#receiver-name').val());
      receiverInfo.receiverProvince = $.trim(this.$modelWrap.find('#receiver-province').val());
      receiverInfo.receiverCity     = $.trim(this.$modelWrap.find('#receiver-city').val());
      receiverInfo.receiverAddress  = $.trim(this.$modelWrap.find('#address').val());
      receiverInfo.receiverPhone    = $.trim(this.$modelWrap.find('#receiver-phone').val());
      receiverInfo.receiverZip      = $.trim(this.$modelWrap.find('#receiver-zip').val());

      if(!receiverInfo.receiverName){
        result.errMsg = '请输入收件人姓名';
      }else if(!receiverInfo.receiverProvince){
        result.errMsg = '请选择所在省份';
      }else if(!receiverInfo.receiverCity){
        result.errMsg = '请选择所在城市';
      }else if(!receiverInfo.receiverAddress){
        result.errMsg = '请输入详细地址';
      }else if(!receiverInfo.receiverPhone){
        result.errMsg = '请输入手机号';
      }else{//所有验证都通过
       result.status = true;
       result.data = receiverInfo;
      }
      return result;
   },
   loadModel : function(){
     var addressModelHtml = _mm.renderHtml(templateAddressModel,{
        isUpdate  : this.option.isUpdate,
        data      : this.option.data
     });
     this.$modelWrap.html(addressModelHtml);
     this.loadProvice();
     
   },
   
   loadProvice : function(){
       
       var provinces = _cities.getProvince() || [],
       $provinceSelect = this.$modelWrap.find('#receiver-province');
       $provinceSelect.html(this.getSelectFunction(provinces));
        //如果是更新地址,并且有省份信息,做省份的回填
       if(this.option.isUpdate && this.option.data.receiverProvince){
             
            $provinceSelect.val(this.option.data.receiverProvince);

             this.loadCities(this.option.data.receiverProvince);
           
       } 
      },
   //加载城市信息
    loadCities : function(provinceName){
      var cities = _cities.getCities(provinceName) || [],
           $citySelect = this.$modelWrap.find('#receiver-city');

          $citySelect.html(this.getSelectFunction(cities))
          //如果是更新地址,并且有城市信息,做城市的回填
          if(this.option.isUpdate && this.option.data.receiverCity){
           
            $citySelect.val(this.option.data.receiverCity);
           
          } 
          
   },

   //获取select框的选项,输入: array,  输出: HTML
   getSelectFunction : function(optionArray){
      var html = '<option value = " ">请选择</option>'
      for(var i = 0, length = optionArray.length; i <length ; i++ ){
          html += '<option value = "' + optionArray[i]+ ' ">'+optionArray[i] +'</option>';
      }
      return html;
   },

};
module.exports = addressModel;