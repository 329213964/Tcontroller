// miniprogram/pages/info/changeaddress/changeaddress.js
var myUtils = require("../../../utils/myUtils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"",
    addressNum:-1,
    addressList:[]
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
    if (myUtils.get("user_address") == "" || myUtils.get("user_address")==null){
      wx.redirectTo({
        url: '/pages/info/address/address',
      })
    }
    var dateList = myUtils.get("user_address").split("|");
    var arr = []
    for (var i in dateList) {
      arr = arr.concat(dateList[i]);
    }
    var addressNum = myUtils.get("addressNum")-1;
    if (addressNum ==-1){
      this.setData({
        addressNum: addressNum,
        addressList: arr
      })
    }else{
      this.setData({
        address: arr[addressNum],
        addressNum: addressNum,
        addressList: arr
      })
    }
    
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
  changeAddress:function(e){
    this.setData({
      address: e.detail.value
    })
  },
  doAddressMethod:function(e){
    var doMethod=myUtils.get("doMethod");
    if (this.data.address == null || this.data.address == ""){
      wx.showModal({
        title: '提示',
        content: '地址不可为空',
        showCancel: false
      })
      return;
    }
    if (doMethod == "update") {
      var addressSum = "";
      var arr = this.data.addressList;
      var addressNum = this.data.addressNum;
      arr[addressNum] = this.data.address

      for (var j in arr) {
        addressSum = addressSum + arr[j];

        var i = j;
        i++;
        if (arr[i] != null) {
          addressSum = addressSum + "|"
        }
      }
      wx.request({
        url: 'http://localhost:8080/user/updateAddress',
        //定义传到后台的数据
        data: {
          //从全局变量data中获取数据
          userid: myUtils.get("userid"),
          userAddress: addressSum
        },
        method: 'get',//定义传到后台接受的是post方法还是get方法
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("调用API成功");
          if (res.data == 0) {
            wx.showModal({
              title: '提示',
              content: '服务器繁忙',
              showCancel: false
            })
            return;
          } else {
            getApp().globalData.user_address = addressSum;
            wx.setStorageSync("user_address", addressSum);
            wx.redirectTo({
              url: '../address/address'
            })

          }

        },
        fail: function (res) {
          console.log("调用API失败");
        }
      })
    } else if (doMethod == "insert") {
      var addressSum = "";
      var arr = this.data.addressList;
      arr = arr.concat(this.data.address);

      for (var j in arr) {
        addressSum = addressSum + arr[j];

        var i = j;
        i++;
        if (arr[i] != null) {
          addressSum = addressSum + "|"
        }
      }
      wx.request({
        url: 'http://localhost:8080/user/updateAddress',
        //定义传到后台的数据
        data: {
          //从全局变量data中获取数据
          userid: myUtils.get("userid"),
          userAddress: addressSum
        },
        method: 'get',//定义传到后台接受的是post方法还是get方法
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("调用API成功");
          if (res.data == 0) {
            wx.showModal({
              title: '提示',
              content: '服务器繁忙',
              showCancel: false
            })
            return;
          } else {
            getApp().globalData.user_address = addressSum;
            wx.setStorageSync("user_address", addressSum);
            wx.redirectTo({
              url: '../address/address'
            })

          }

        },
        fail: function (res) {
          console.log("调用API失败");
        }
      })
    }
  }
})