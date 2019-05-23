//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

// 引入SDK核心类
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')

// 实例化API核心类
var qqmapsdk = new QQMapWX({
      key: 'XGABZ-HIHW3-6OZ3G-3MXWQ-OCMLF-QJBGD'  
    })

Page({
  data: {
    motto: 'Hello World',
    //当前时间
    nowDate:"",
    //当前位置
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    this.getUserLocation();
    
    
  },
  //产看用户权限
  getUserSetting: function(){
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true}
      }
    });
  },
  //获取地理位置
  getUserLocation: function(){
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // console.log(JSON.stringify(res))
        that.getCityLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    });
  },
  getCityLocal: function (latitude, longitude) {
    let that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        that.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        });
        // console.log(JSON.stringify(res));
      },
      fail: function (res) {
        console.log(res);
      }
    });

 


  },
  //页面跳转
  toNotes: function () {
  },
  //post数据
  formSubmit: function(e) {  
    var t = e.detail.value;
    this.setData({
      nowDate: util.formatTime(new Date())
    });
    console.log(t.content);
    //提交操作全部结束之后才会把值渲染到视图
 
    //云函数--------------------------------------------------
    wx.cloud.callFunction({
      name: 'addrecord',
      data: {
        content: e.detail.value.content, //string
        tags: e.detail.value.tags,  //数组
        site: e.detail.value.location //string
      },
      success: res => {
        // 调用成功
        // 返回结果放在res.result中，类型为json
         wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1500
          });
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/notes/notes',
          })
        }, 1500)
  
      },
      fail: err => {
        // 调用失败
        console.log(err.errMsg);

      },
      complete:function(){
        // wx.navigateTo({
        //   url: '/pages/notes/notes',
        // })
      }
    })

   
   
  }
})
