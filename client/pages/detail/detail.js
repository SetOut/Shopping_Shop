const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    product: {}
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProduct(options.id);
  },
  // 商品购买
  buy(){
    wx.showLoading({
      title: '商品购买中...',
    })
     qcloud.request({
       url: config.service.addOrder,
       login: true,
       method: 'POST',
       success: result =>{

          wx.hideLoading()

          let data = result.data
          if(!data.code){
            wx.showToast({
              title: '商品购买成功',
            })
          }else{
            wx.showToast({
              icon:'none',
              title: '商品购买失败',
            })
          }
       },
       fail:()=>{
         wx.hideLoading()
         wx.showToast({
           icon: 'none',
           title: '商品购买失败',
         })
       }
     })
  }, 
 // 获取商品详情
  getProduct(id){
   wx.showLoading({
     title: '商品加载中...',
   })
   qcloud.request({
     url: config.service.productDetail + id,
     success: result => {
       // 成功隐藏
       wx.hideLoading()
       let data = result.data
       if (!data.code) {
         this.setData({
           product: data.data
         })
       } else {
         // 失败后,两秒后返回首页
         setTimeout(() => {
           wx.navigateBack()
         }, 2000)
       }
     },
     fail: err => {
       wx.hideLoading(),
         // 失败后,两秒后返回首页
         setTimeout(() => {
           wx.navigateBack()
         }, 2000)
     }
   });
 }
})