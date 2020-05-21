const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({

   /**
      * 页面的初始数据 
      */
   data: {
     userInfo: null,
     locationAuthType: app.data.locationAuthType
   },
// 收货地址
   onTapAddress() {
     wx.showToast({
       icon: 'none',
       title: '此功能暂未开放'
     })
   },
  //客服
   onTapKf() {
     wx.showToast({
       icon: 'none',
       title: '此功能暂未开放'
     })
   },

 // 登录
   onTapLogin: function () {
     app.login({
       success: ({ userInfo }) => {
         this.setData({
           userInfo,
           locationAuthType: app.data.locationAuthType
         })
       },
       error: () => {
         this.setData({
           locationAuthType: app.data.locationAuthType
         })
       }
     })
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
     // 同步授权状态
     this.setData({
       locationAuthType: app.data.locationAuthType
     })
     // 检查页面是否有session
     app.checkSession({
       success: ({ userInfo }) => {
         this.setData({
           userInfo
         })
       }
     })
   }

 
  //  onTapLogin:function (){
  //    const session = qcloud.Session.get()
  //    qcloud.setLoginUrl(config.service.loginUrl)
  //    qcloud.login({
  //      success: result => {
  //        if (result) {
  //          let userInfo = result
  //          this.setData({
  //           userInfo
  //         })         
  //        } else {
  //          // 如果不是首次登录,不会返回用户信息,请求用户信息接口获取
  //          this.getUserInfo({ success, error })
  //        }
  //      },
  //      fail: () => {
  //        error && error()
  //      }
  //    })
  //  },
  
  //  checkSession({ session,error }){ 
  //     wx.checkSession({
  //       success: () =>{
  //         this.getUserInfo({success,error})
  //       },
  //       fail:() =>{
  //         error && error()
  //       }
  //     })
  //  }
})