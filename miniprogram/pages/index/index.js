//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    numall:'',
    proportion:85,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.cloud.callFunction({
      name: 'adduser',
      data: {},
      success: res => {
        // 调用成功
        // 返回结果放在res.result中，类型为json
        console.log(res.result)
      },
      fail: err => {
        console.log(err.errMsg)
      }
    })
    var that = this;
    wx.cloud.callFunction({
      name: 'getnum',
      data: {},
      success: res => {
        // 调用成功
        // 返回结果放在res.result中，类型为json
        console.log(res.result)
        that.setData({
          numall: res.result.recoNum
        })
      },
      fail: err => {
        console.log(err.errMsg)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toAddPage:function(){
    wx.navigateTo({
      url:"/pages/add/add",
    })
  },
  toAboutPage:function(){
    wx.navigateTo({
      url:"/pages/about/about",
    })
  },
  toGuidePage:function(){
    wx.navigateTo({
      url:"/pages/guide/guide",
    })
  },
})
