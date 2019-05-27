// miniprogram/pages/info/address/address.js
var myUtils = require("../../../utils/myUtils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist: []
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
    var dateList = myUtils.get("user_address").split("|");
    var arr = []
    for (var i in dateList) {
      arr = arr.concat(dateList[i]);
      console.log(arr)
    }
    this.setData({
      addresslist: arr
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getApp().globalData.addressNum = null;
    getApp().globalData.doMethod = null;
    wx.setStorageSync("addressNum", null);
    wx.setStorageSync("doMethod", null)
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
  updateAddress:function(e){
    var addressNum = e.currentTarget.dataset.addressnum+1;
    var doMethod="update";
    console.log(e.currentTarget.dataset);
    getApp().globalData.addressNum = addressNum;
    getApp().globalData.doMethod = doMethod;
    wx.setStorageSync("addressNum", addressNum);
    wx.setStorageSync("doMethod", doMethod)
    wx.navigateTo({
      url: '../changeaddress/changeaddress',
    })
    return;
  }
})