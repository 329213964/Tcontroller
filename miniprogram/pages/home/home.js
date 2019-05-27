// miniprogram/pages/home/home.js
//导包
var myUtils = require("../../utils/myUtils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_status: 0,
    menu:[]
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
    if (myUtils.get("login_status") != null) {
      var status = myUtils.get("login_status");
    } else {
      var status = 0;
    }
    this.setData({
      login_status: status
    })

    var that = this;
    var status = myUtils.get("login_status");
    wx.request({
      url: 'https://fix.foxcii.com/know/selectAll',
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
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
  guarantee:function(e){
    wx.navigateTo({
      url: '/pages/home/guarantee/guarantee',
    })
  },
  /**
   * 登录跳转
   */
  login_href: function (e) {
    wx.navigateTo({
      url: '/pages/home/login/login',
    })
  },
  knowin:function(e){
    var knowName = e.currentTarget.dataset.know.mdfile
    var knowid = e.currentTarget.dataset.know.knowid
    if(knowid==null||knowid==""){
      knowName = e.currentTarget.dataset.know
    }
    console.log(e.currentTarget);
    getApp().globalData.knowName = knowName;
    getApp().globalData.knowid = knowid;
    //将用户的信息保存到手机存储卡中
    wx.setStorageSync("knowName", knowName);
    wx.setStorageSync("knowid", knowid);
    wx.navigateTo({
      url: './advertise/advertise-info/advertise-info',
    })
  }

})