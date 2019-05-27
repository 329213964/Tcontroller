// miniprogram/pages/employ/fix/fix.js
var myUtils = require("../../../utils/myUtils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    employid:null,
    employTime:null,
    employStatus:null,
    fixid:-1,
    fixName:null,
    fixPhone:null,
    address:null,
    info:null
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
    var that=this;
    wx.request({
      url:'https://fix.foxcii.com/employ/selectByEmployid',
      data: {
        //从全局变量data中获取数据
        employid: myUtils.get("employid")
      },
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("调用API成功");
        console.log(res.data);
        if (res.data) {
          that.setData({
            employid:res.data.employid,
            employTime:res.data.employTime,
            employStatus:res.data.employStatus,
            address: res.data.employAddress,
            info: res.data.employInfo,
            fixid:res.data.fixid
          })
          if(that.data.fixid==null||that.data.fixid==""){
            return;
          }
          wx.request({
            url: 'https://fix.foxcii.com/fixer/selectByfixid',
            data: {
              //从全局变量data中获取数据
              fixid: that.data.fixid
            },
            method: 'get',//定义传到后台接受的是post方法还是get方法
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (ress) {
              console.log("调用API成功");
              console.log(ress.data);
              if (ress.data) {
                that.setData({
                  fixName:ress.data.fixName,
                  fixPhone:ress.data.fixPhone
                })
                getApp().globalData.employid = null;
                wx.setStorageSync("employid", null);
              }
            }
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

  }
})