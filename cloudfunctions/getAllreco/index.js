// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'onetime-9jejf'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const records = await db.collection("RECORDS").where({
    openid: wxContext.OPENID
  }).get()

  return {
    recordlist: records
  }
}