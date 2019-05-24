//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const time = require('../../utils/timeten.js')


// 引入SDK核心类
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')

// 实例化API核心类
var qqmapsdk = new QQMapWX({
      key: 'XGABZ-HIHW3-6OZ3G-3MXWQ-OCMLF-QJBGD'  
    })


Page({
  data: {
    motto: 'Hi notes',
    userInfo: {},
    hasUserInfo: false,
    //当前时间
    nowDate:'',
    //当前位置
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    array:[
      {id:1,message:'今天上了英语课'},
      {id:2,message:'今天上了数学课'},
      {id:3,message:'点击查看详情'}
    ],
    alist: [ ],
    olist: [ ],
    timeget:''
  },
  onLoad: function () {
    var that = this;

    //云函数
    wx.cloud.callFunction({
      name: 'getAllreco',
      data: { },
      success: res => {
        // 调用成功
        // 返回结果放在res.result中，类型为json
         
        that.setData({
          olist: res.result.recordlist.data,
        });
        //转换日期
        that.timeToDate();
        // console.log(that.data.olist)
        that.setData({
          alist: that.data.olist,
        });
        // wx.showToast({
        //   title: '成功',
        //   icon: 'success',
        //   duration: 2000
        // });
      },
      fail: err => {
        // 调用失败
        console.log(err.errMsg);
      }
    })
    // this.getJsonData();
  },
  //
  timeToDate:function(){
    for(var i=0; i<this.data.olist.length; i++){
      var temp = time.getLocalTime(this.data.olist[i].datetime);
      this.data.olist[i].xtime = temp;
      
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;

    //云函数
    wx.cloud.callFunction({
      name: 'getAllreco',
      data: {},
      success: res => {
        // 返回结果放在res.result中，类型为json
        that.setData({
          olist: res.result.recordlist.data,
        });
        //转换日期
        that.timeToDate();
        that.setData({
          alist: that.data.olist,
        });
        // wx.showToast({
        //   title: '成功',
        //   icon: 'success',
        //   duration: 2000
        // });
        //数据异步请求结束之后再停止下拉动画
        wx.stopPullDownRefresh();

      },
      fail: err => {
        console.log(err.errMsg);
      }
    });
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
  

  //跳转至详情页
  toDetail:function(event){
    // console.log(event.currentTarget.dataset.id);
    var idx = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:"/pages/detail/detail?ID="+idx,
    })
  }
})


   /*wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    */

  //测试json数据
  // getJsonData:function(){
  //   var that = this;
  //   wx.request({
  //     url:"https://30paotui.com/article/list",
  //     success:function(res){
  //       that.setData({
  //         alist:res.data.data
  //       });
  //       console.log(that.data.alist);

  //     },
  //     fail:function(err){
  //       console.log(err)
  //     }
  //   });
  
  // },
