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
    return {
      mesg:'user is not exist'
    }
  }
  await db.collection("RECORDS").add({
    data: {
      openid: wxContext.OPENID,
      content: event.content,
      datetime: Date.now(),
      tags: event.tags,
      site: event.site
    }
  })
  const _ = db.command
  await db.collection("USERS").where({
    openid: wxContext.OPENID
  }).update({
    data: {
      numOfReco: _.inc(1)
    }
  })
  return {
    mesg: 'Add successfully'
  }
}