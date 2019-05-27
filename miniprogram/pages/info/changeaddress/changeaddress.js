// miniprogram/pages/info/changeaddress/changeaddress.js
var myUtils = require("../../../utils/myUtils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:-1
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
    var dateList = myUtils.get("user_address").split("|");
    var arr = []
    for (var i in dateList) {
      arr = arr.concat(dateList[i]);
      console.log(arr)
    }
    var addressNum = myUtils.get("addressNum")-1;
    console.log(addressNum);
    this.setData({
      address: arr[addressNum]
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