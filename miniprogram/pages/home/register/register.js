// pages/register/register.js

var myUtils = require("../../../utils/myUtils.js")
Page({

  /**
   * 页面的初始数据
   * data为全局变量
   */
  data: {
    account: "",
    password: "",
    checkpassword:""
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

  //处理accountInput的触发事件
  accountInput: function (e) {
    var username = e.detail.value;//从页面获取到用户输入的用户名/邮箱/手机号
    if (username != '') {
      this.setData({ account: username });//把获取到的密码赋值给date中的password
    }
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
  },
  login_href: function (e) {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  //处理register的触发事件
  register: function (e) {
    console.log(this.data.account);
    if (this.data.account == '' || this.data.password == '' || this.data.checkpassword==''){
      wx.showModal({
        title: '提示',
        content: '不可留空',
        showCancel: false
      })
      return;
    } else if (this.data.password != this.data.checkpassword){
      wx.showModal({
        title: '提示',
        content: '两次密码不一致',
        showCancel: false
      })
      return;
    } else if (this.data.checkpassword.length<6){
      wx.showModal({
        title: '提示',
        content: '密码不得少于6个字符',
        showCancel: false
      })
      return;
    }
    var userid = myUtils.get("userid");
    if (userid==""){
      wx.request({
        url: 'http://localhost:8080/user/register',
        //定义传到后台的数据
        data: {
          //从全局变量data中获取数据
          userName: this.data.account,
          userPwd: this.data.checkpassword
        },
        method: 'get',//定义传到后台接受的是post方法还是get方法
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("调用API成功");
          if (res.data.userid == -1) {
            wx.showModal({
              title: '提示',
              content: '用户名已被注册',
              showCancel: false
            })
            return;
          } else if (res.data.userid == null) {
            wx.showModal({
              title: '提示',
              content: '服务器繁忙，请稍后重试',
              showCancel: false
            })
            return;
          } else {
            //-------------- 注册成功，获得的注册信息进行相应处理--------------


            // -------------------------------------------------------------
            wx.redirectTo({
              url: '../phone/phone'　　// 注册成功，跳转到绑定页面
            })

          }

        },
        fail: function (res) {
          console.log("调用API失败");
        }
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/user/registerByUserid',
        //定义传到后台的数据
        data: {
          //从全局变量data中获取数据
          userid:userid,
          userName: this.data.account,
          userPwd: this.data.checkpassword
        },
        method: 'get',//定义传到后台接受的是post方法还是get方法
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("调用API成功");
          if (res.data.userid == -1) {
            wx.showModal({
              title: '提示',
              content: '用户名已被注册',
              showCancel: false
            })
            return;
          } else if (res.data.userid == null) {
            wx.showModal({
              title: '提示',
              content: '服务器繁忙，请稍后重试',
              showCancel: false
            })
            return;
          } else {
            //-------------- 注册成功，获得的注册信息进行相应处理--------------


            // -------------------------------------------------------------
            wx.redirectTo({
              url: '../phone/phone'　　// 注册成功，跳转到绑定页面
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