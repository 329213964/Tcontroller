// miniprogram/pages/info/info.js
//导包
var myUtils = require("../../utils/myUtils.js")

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    login_status:0,
    user_name:"",
    user_phone:"",
    user_icon: "",
    user_address: "",
    wx_status:0
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
    if (myUtils.get("login_status")!=null){
      var status = myUtils.get("login_status");
    }else{
      var status = 0;
    }
    
    if (status == 1) {
      var user_icon = myUtils.get("user_icon");
      var user_name = myUtils.get("user_name");
      var user_phone = myUtils.get("user_phone");
      var user_address = myUtils.get("user_address");
      this.setData({
        user_name: user_name,
        user_phone: user_phone,
        user_icon: user_icon,
        user_address: user_address
      })
      var wx_status = myUtils.get("wx_id");
      if(wx_status!=null){
        this.setData({
          wx_status: 1
        })
      }
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
  /**
   * 登录跳转
   */
  login_href:function(e){
    wx.navigateTo({
      url: '/pages/home/login/login',
    })
  },

  loggout:function(e){
    this.setData({
      wx_status:0,
      login_status: 0,
      user_name: "",
      user_phone: "",
      user_icon: "",
      user_address: ""
    })
    //更新getApp().globalData中的数据，是更新内存中的数据
    getApp().globalData.login_status = 0
    getApp().globalData.user_address = ""
    getApp().globalData.user_icon = ""
    getApp().globalData.user_phone = ""
    getApp().globalData.user_name = ""
    getApp().globalData.wx_id=null
    //将用户的信息保存到手机存储卡中
    wx.setStorageSync("login_status", 0)
    wx.setStorageSync("user_address", "")
    wx.setStorageSync("user_icon", "")
    wx.setStorageSync("user_phone", "")
    wx.setStorageSync("user_name", "")
    wx.setStorageSync("wx_id", "")
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})