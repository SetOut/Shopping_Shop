// 获取所有商品信息

// 引入db
const DB =require('../utils/db.js')

// 打包导出供外部使用
module.exports = {
    // list功能名
    list: async ctx =>{
      // 调取查询功能    将所有数据打包传至对象
      ctx.state.data = await DB.query("select * from product;")
    },
    // 商品详情
    detail : async ctx =>{
      // ctx.params.id 外部传递的参数
      productID = + ctx.params.id

      if (!isNaN(productID)){
        ctx.state.data = (await DB.query("select * from product where product.id =?", [productID]))[0]

      }else{
        ctx.state.data = {}
      }
      

      
    }
}