


Page({
  //定义全局变量data
  data: {
    account: "",
    password: "",
    message: ""
  },

  //处理accountInput的触发事件
  accountInput: function (e) {
    var username = e.detail.value;//从页面获取到用户输入的用户名/邮箱/手机号
    if (username != '') {
      this.setData({ account: username });//把获取到的密码赋值给全局变量Date中的password
    }
  },

  //跳转注册
  register_href:function(e){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  //处理pwdBlurt的触发事件
  pwdBlur: function (e) {
    var pwd = e.detail.value;//从页面获取到用户输入的密码
    if (pwd != '') {
      this.setData({ password: pwd });//把获取到的密码赋值给全局变量Date中的password
    }
  },
  wxlogin:function(e){
    wx.navigateTo({
      url: '../login/login-other/login-other',
    })
  },


  //处理login的触发事件
  login: function (e) {
    if (this.data.account == ''|| this.data.password==''){
        wx.showModal({
          title: '提示',
          content: '不可留空',
          showCancel: false
        })
        return;
    }
    
    wx.request({
      url: 'http://localhost:8080/user/login',//后面详细介绍
      //定义传到后台的数据
      data: {
        //从全局变量data中获取数据
        userName: this.data.account,
        userPwd: this.data.password,
      },
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("调用API成功");
        console.log(res.data);
        if (res.data) {
          wx.showToast({
            title: '登陆成功',
          })
          if(res.data.userPhone==null){
            getApp().globalData.userid=res.data.userid
            wx.setStorageSync("userid", res.data.userid);
            wx.redirectTo({
              url: '/pages/home/phone/phone',
            })
            return;
          }
          //更新getApp().globalData中的数据，是更新内存中的数据
          getApp().globalData.login_status = 1
          getApp().globalData.user_icon=res.data.userInfo
          getApp().globalData.user_phone = res.data.userPhone.substring(0, 3) + '*****' + res.data.userPhone.substring(8, 3)
          getApp().globalData.user_name = res.data.userName
          getApp().globalData.wx_id = res.data.wxId
          getApp().globalData.userid = res.data.userid
          wx.setStorageSync("userid", res.data.userid);
          //将用户的信息保存到手机存储卡中
          wx.setStorageSync("login_status",1)
          wx.setStorageSync("user_icon", res.data.userInfo)
          wx.setStorageSync("user_phone", res.data.userPhone.substring(0, 3) + '*****' + res.data.userPhone.substring(8, 11))
          wx.setStorageSync("user_name", res.data.userName)
          wx.setStorageSync("wx_id", res.data.wxId)
          wx.switchTab({
            url: '/pages/home/home',
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '用户名或者密码错误',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  }
})