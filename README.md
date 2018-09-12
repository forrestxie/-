# -
该项目主要采用jQuery进行开发，采用前后端分离的方式通过ajax对后台调取数据，利用webpack
进行打包，实现了前端的模块化、工程化以及面向对象编程的思想.
由于本作品的只实现电商平台的前端部分,若要进行与后台对接,还需要使用fiddler或charles进行服务器的代理,配置如下:
http://localhost:8088/user/*    代理:  http://test.happymmall.com:80/user/
http://localhost:8088/list.do/  代理:  http://test.happymmall.com:80/product/list.do/
http://localhost:8088/product/* 代理:  http://test.happymmall.com:80/product/
http://localhost:8088/cart/*    代理:  http://test.happymmall.com:80/cart/
http://localhost:8088/order/*   代理:  http://test.happymmall.com:80/order/
http://localhost:8088/order/*   代理:  http://test.happymmall.com:80/order/
http://localhost:8088/shipping/*   代理:  http://test.happymmall.com:80/shipping/
