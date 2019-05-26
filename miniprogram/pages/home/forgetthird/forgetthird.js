// miniprogram/pages/home/forgetthird/forgetthird.js
var myUtils = require("../../../utils/myUtils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: "",
    checkpassword: ""
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
  //处理pwdBlur的触发事件
  pwdBlur: function (e) {
    var pwd = e.detail.value;//从页面获取到用户输入的密码
    if (pwd != '') {
      this.setData({ password: pwd });//把获取到的密码赋值给date中的password
    }
  },
  //处理checkpwdBlur的触发事件
  checkpwdBlur: function (e) {
    var checkpwd = e.detail.value;//从页面获取到用户输入的密码
    if (checkpwd != '') {
      this.setData({ checkpassword: checkpwd });//把获取到的密码赋值给date中的password
    }
  },updatePwd:function(e){
      if (this.data.password == '' || this.data.checkpassword == '') {
        wx.showModal({
          title: '提示',
          content: '不可留空',
          showCancel: false
        })
        return;
      } else if (this.data.password != this.data.checkpassword) {
        wx.showModal({
          title: '提示',
          content: '两次密码不一致',
          showCancel: false
        })
        return;
      } else if (this.data.checkpassword.length < 6) {
        wx.showModal({
          title: '提示',
          content: '密码不得少于6个字符',
          showCancel: false
        })
        return;
      }else{
        var userName = myUtils.get("user_name");
        wx.request({
          url: 'https://fix.foxcii.com/user/updatePwd',
          //定义传到后台的数据
          data: {
            //从全局变量data中获取数据
            userName: userName,
            userPwd: this.data.checkpassword
          },
          method: 'get',//定义传到后台接受的是post方法还是get方法
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log("调用API成功");
            console.log(res.data);
            if (res.data == 1) {
              wx.redirectTo({
                url: '../forgetfourth/forgetfourth'　　// 注册成功，跳转到绑定页面
              })
              return;
            } else {
              wx.showModal({
                title: '提示',
                content: '服务器繁忙',
                showCancel: false
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