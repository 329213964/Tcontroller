

// miniprogram/pages/home/forget/forget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forgetName:""
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
  accountInput:function(e){
    this.setData({
      forgetName:e.detail.value
    })
  },
  selectName:function(e){
    wx.request({
      url: 'https://fix.foxcii.com/user/isAccount',//后面详细介绍
      //定义传到后台的数据
      data: {
        //从全局变量data中获取数据
        userName: this.data.forgetName,
      },
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("调用API成功");
        console.log(res.data);
        if (res.data.userid!=null) {
          
          //更新getApp().globalData中的数据，是更新内存中的数据
          getApp().globalData.user_phone = res.data.userPhone.substring(0, 3) + '*****' + res.data.userPhone.substring(8, 3)
          getApp().globalData.user_phone_true = res.data.userPhone
          getApp().globalData.user_name = res.data.userName
          //将用户的信息保存到手机存储卡中
          wx.setStorageSync("user_phone", res.data.userPhone.substring(0, 3) + '*****' + res.data.userPhone.substring(8, 11))
          wx.setStorageSync("user_phone_true", res.data.userPhone)
          wx.setStorageSync("user_name", res.data.userName)
          wx.redirectTo({
            url: '../forgetsecond/forgetsecond',
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '用户名不存在',
            showCancel: false
          })
          return;
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  }
})