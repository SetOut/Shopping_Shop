const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      productList: [],
      id : []
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) { 
     this.getProductList()
   },
    
    // 获取商品数据
    getProductList(){
      wx.showLoading({
        title: '商品信息加载中...',
      })
      qcloud.request({
        url: config.service.productList,
        success: response => {
          // 完成并取消加载
          wx.hideLoading()
          if (!response.data.code){
            this.setData({
              productList: response.data.data
            })
          }else{
            wx.showToast({
              title: '商品信息加载失败',
            })
          }        
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            title: '商品信息加载失败',
          })
          console.log(err);
        }, 
      });
    },
 
    // 获取当前商品下标并跳转
    onProduct : function(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../detail/detail?id=' + id,
      })
    }
})