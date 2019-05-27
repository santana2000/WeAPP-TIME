// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'onetime-9jejf'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const userlist = await db.collection("USERS").where({
    openid: wxContext.OPENID
  }).get()

  if (userlist.data.length == 0) {
    await db.collection("USERS").add({
      data:{
        openid: wxContext.OPENID,
        numOfReco: 0,
        numOfPlan: 0,
        suceRate: 0
      }
    })
    return {
      event,
      mesg: 'new user added'
    }
  }
  return {
    event,
    mesg: 'user is existed',
  }
}