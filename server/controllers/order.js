// 操作订单功能
const DB = require('../utils/db.js')

//对外逻辑的接口
module.exports = {
      
      // 创建用户订单
      add:async ctx =>{
        // 区别用户
         let user = ctx.state.$wxInfo.userinfo.openid;
         console.log(user);
         //|| 或运算   list为真赋值productList，假为空
         // 读取list  
         let productList = ctx.request.body.list || []
        
        // 出入订单至order_user表
        let order = await DB.query("insert into order_user(user) values(?)"[user])
      // 获取orderId
      let orderId = order.insertId
      // 构建插入订单商品表的SQL代码
      let sql = 'insert into order_product(order_id producct_id,count) values'
       
      let param = []
      let query = []
      // 插入多个商品
      productList.forEach(product =>{

        query.push('(?,?,?)')

        param.push(orderId)
        param.push(productList.id)
        param.push(productList.count || 1)

       
      })
      await DB.query(sql + query.join(','), param) 
      },
      // 服务端下载订单数据
      list:async ctx =>{
        // 获取用户的openId
        let user = ctx.state.$wxInfo.userinfo.openid;
        // 查询想要数据
        let list = await DB.query('SELECT order_user.id AS `id`,order_user.user AS `user`,order_user.create_time AS `create_time`,order_product.product_id AS `product_id`,order_product.count AS `count`,product.name AS `name`,product.image AS `image`,product.price AS `price`, FROM order_user LEFT JOIN order_prodcuct ON order_user.id = order_product.order_id LEFT JOIN product ON order_product.product_id = product.id WHERE order_user.user = ? ORDER BY  order_product.order_id',[user])
        
        

       let ret = []
       let cacheMap = {}
       let block = []
       let id = 0
       list.forEach(order =>{
         if(!cacheMap[order.id]){
           block = []
           ret.push({
             id: ++id,
             list: block
           })
           cacheMap[order.id] = true
         }
         block.push(order)
       })

        ctx.state.data = ret
      }
}