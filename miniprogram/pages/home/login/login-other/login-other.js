// miniprogram/pages/home/login/login-other/login-other.js
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
  wxlogin: function () {
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
            wx.request({
              url: 'http://localhost:8080/user/wx/login', //接口地址
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                console.log(res.data);
                if (res.data.data.userName == null) {
                  getApp().globalData.login_status = 1
                  getApp().globalData.userid = res.data.data.userid
                  wx.setStorageSync("userid", res.data.data.userid)
                  wx.redirectTo({
                    url: '/pages/home/register/register',
                  })
                }else if (res.data.data.userPhone == null){
                  getApp().globalData.login_status = 1
                  getApp().globalData.userid = res.data.data.userid
                  wx.setStorageSync("userid", res.data.data.userid)
                  wx.redirectTo({
                    url: '/pages/home/phone/phone',
                  })
                }else {
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
  },
})