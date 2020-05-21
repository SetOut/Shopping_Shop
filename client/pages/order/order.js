const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({

   /**
    * 页面的初始数据
    */
   data: {
        userInfo: null,
        locationAuthType: app.data.locationAuthType,
        orderList : [] 
        // orderList : [{
        //   id : 1,
        //   list:[{
        //     count: 1,
        //     image: 'https://img.alicdn.com/bao/uploaded/TB1krOFCgHqK1RjSZJnSuvNLpXa.jpg_300x300',
        //     name: "清酒",
        //     price: 105
        //   }]
        // },
        // {
        //   id : 2,
        //   list:[{
        //     count: 1,
        //     image: 'https://img.alicdn.com/imgextra/i1/2697072673/O1CN011VcH8zh8HS4nMEF_!!2697072673.jpg_300x300',
        //     name: "卫衣",
        //     price: 55
        //   }]
        // },
        // {
        //   id:3,
        //   list:[{
        //   count: 3,
        //   image: 'https://gd2.alicdn.com/imgextra/i2/641517341/TB2_Lb.ieOSBuNjy0FdXXbDnVXa_!!641517341.jpg',
        //   name: "短袖",
        //   price: 55
        //   }]
        // }]
   },
   
   getOrder(){
     wx.showLoading({
       title: '刷新订单数据...',
     })
     qcloud.request({
       url:config.service.orderList,
       login: true,
       method: 'GET',
       success: result =>{
         console.log('1'+result)
         wx.hideLoading()
         let data = result.data
         if(!data.code){
           this.setData({
             orderList : data.data
           })
         }else{
           console.log('2' + result)
           wx.showToast({
             icon: 'none',
             title: '订单数据刷新失败'
           })
         }
       },
       fail : result =>{
         wx.hideLoading(),
           console.log('3' + result)
         wx.showToast({
           icon: 'none',
           title: '订单数据刷新失败'
         })
       }
     })
   },

   // 微信登录
   onTapLogin(){
      app.login({
        success: ({userInfo})=>{
          this.setData({
            userInfo,
            locationAuthType: app.data.locationAuthType
          })
        }
      })
      this.getOrder()
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
        app.checkSession({
          success: ({userInfo})=>{
            this.setData({
              userInfo,
              locationAuthType: app.data.locationAuthType
            })
          }
        }) 
        this.getOrder()
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
     // 同步授权状态
     this.setData({
       locationAuthType: app.data.locationAuthType
     })
   }
})