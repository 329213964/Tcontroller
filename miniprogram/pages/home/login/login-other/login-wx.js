// miniprogram/pages/home/login/login-other/login-wx.js
const app = getApp();
var myUtils = require("../../../../utils/myUtils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo:function(e){
    
  },
  bindWx:function(e){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log("授权成功");
            }, fail: function (res) {
              console.log("授权失败");
              return;
            }
          })
        }
        wx.login({
          success: function (res) {
            console.log(res.code)
            console.log(res)
            //发送请求
            var userid = myUtils.get("userid");
            wx.request({
              url: 'http://localhost:8080/user/wx/bind', //接口地址
              data: {
                userid:userid,
                code: res.code
              },
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                console.log(res.data);
                if (res.data.status == 200) {
                  
                  wx.switchTab({
                    url: '/pages/info/info',
                  })
                  wx.showModal({
                    title: '提示',
                    content: '该微信已被绑定',
                    showCancel: false
                  })
                } else if (res.data.status==300) {
                  
                  wx.switchTab({
                    url: '/pages/info/info',
                  })
                  wx.showModal({
                    title: '提示',
                    content: '此账户已绑定微信',
                    showCancel: false
                  })
                } else {
                  getApp().globalData.login_status = 1
                  getApp().globalData.user_address = res.data.data.userAddress
                  getApp().globalData.user_icon = res.data.data.userInfo
                  getApp().globalData.user_phone = res.data.data.userPhone.substring(0, 3) + '*****' + res.data.data.userPhone.substring(8, 3)
                  getApp().globalData.user_name = res.data.data.userName
                  getApp().globalData.wx_id = res.data.data.wxId
                  //将用户的信息保存到手机存储卡中
                  wx.setStorageSync("login_status", 1)
                  wx.setStorageSync("user_address", res.data.data.userAddress)
                  wx.setStorageSync("user_icon", res.data.data.userInfo)
                  wx.setStorageSync("user_phone", res.data.data.userPhone.substring(0, 3) + '*****' + res.data.data.userPhone.substring(8, 11))
                  wx.setStorageSync("user_name", res.data.data.userName)
                  wx.setStorageSync("wx_id", res.data.data.wxId)
                  console.log("true");
                  wx.switchTab({
                    url: '/pages/home/home',
                  })
                }
              }
            })
          }
        })
      }, fail(res) {
        console.log("error");
      }
    })
  }
  

  
})