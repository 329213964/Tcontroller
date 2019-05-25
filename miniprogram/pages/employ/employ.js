var myUtils = require("../../utils/myUtils.js")

// miniprogram/pages/employ/employ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_status: 0,
    menu:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var status = myUtils.get("login_status");
    if(status==0)return;
    wx.request({
      url: 'https://skr.foxcii.com/menu/selectAll',
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log("调用API成功");
        console.log(res.data);
        if (res.data) {
          that.setData({
            menu: res.data
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '服务器繁忙',
            showCancel: false
          })
        }
      }
    })
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
    if (myUtils.get("login_status") != null) {
      var status = myUtils.get("login_status");
    } else {
      var status = 0;
    }
    this.setData({
      login_status: status
    })
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
    wx.showNavigationBarLoading() //在标题栏中显示加载

    setTimeout(function () {

      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500);
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

  login_href: function (e) {
    wx.navigateTo({
      url: '/pages/home/login/login',
    })
  },
})