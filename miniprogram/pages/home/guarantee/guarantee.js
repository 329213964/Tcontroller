// miniprogram/pages/home/guarantee/guarantee.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 最大字符数
    maxTextLen: 200,
    // 默认长度
    textLen: 0

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
    //处理addressInput的触发事件
  addressInput: function (e) {
    
    
  },
 

  //处理infoInput的触发事件
  infoInput: function (e) {
      let page = this;
         // 设置最大字符串长度(为-1时,则不限制)
      let maxTextLen = page.data.maxTextLen;
         // 文本长度
      let textLen = e.detail.value.length;
  
      page.setData({
        maxTextLen: maxTextLen,
        textLen: textLen
    });
    
  }
})