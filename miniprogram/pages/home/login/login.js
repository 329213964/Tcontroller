


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
      url: 'https://skr.foxcii.com/user/login',//后面详细介绍
      //定义传到后台的数据
      data: {
        //从全局变量data中获取数据
        username: this.data.account,
        password: this.data.password,
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
          // wx.switchTab({
          //   url: '/pages/home/home',
          // })
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