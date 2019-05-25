// miniprogram/pages/info/changefirst/changefirst.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["86", "80", "84", "87"],
    countryCodeIndex: 0,
    phoneNum: "",
    isclick: false,
    isnum: 'weui-vcode-btn',
    isnumtext: '获取验证码',
    cooldownNum: 60,
    timer: 'cd'
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

  bindCountryCodeChange: function (e) {
    //console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  inputPhoneNum: function (e) {
    // console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },

  genVerifyCode: function () {
    if (this.data.isclick) return;

    this.cooldown()
    //获取国家代码的索引
    var index = this.data.countryCodeIndex;
    //根据索引取值
    var countryCode = this.data.countryCodes[index];
    //获取输入的手机号
    var phoneNum = this.data.phoneNum;
    // console.log(countryCode,phoneNum) 
    //想后台发送请求
    wx.request({
      //小程序访问的网络请求协议必须是https，url里面不能有端口号
      url: "http://localhost:8080/user/genCode",
      //传递的参数
      data: {
        countryCode: countryCode,
        phoneNum: phoneNum
      },
      //发送请求的方式
      method: 'GET',
      success: function (res) {
        wx.showToast({
          title: '已发送，请查收!',
          duration: 2000,

        })

        // console.log(res)
      }

    })

    this.setData({
      isclick: true,
      isnum: 'weui-vcode-btn-clicked',
      isnumtext: '已发送(' + this.data.cooldownNum + 's)'
    })




  },
  cooldown: function () {
    var that = this;
    var cooldownNum = that.data.cooldownNum;
    that.setData({
      cd: setInterval(function () {
        cooldownNum--;
        if (cooldownNum == 0) {
          clearInterval(that.data.cd);
          cooldownNum = 60;
          that.data.isclick = false;
          that.data.isnum = 'weui-vcode-btn';
          that.data.isnumtext = '获取验证码'
        } else {
          that.data.isnumtext = '已发送(' + cooldownNum + 's)'
        }
        that.setData({
          cooldownNum: cooldownNum,
          isnumtext: that.data.isnumtext,
          isclick: that.data.isclick,
          isnum: that.data.isnum
        })

      }, 1000)
    })
  },

  formSubmit: function (e) {
    var phoneNum = e.detail.value.phoneNum;
    var verifyCode = e.detail.value.verifyCode;
    //向后台发送请求，进行校验
    wx.request({
      url: 'http://localhost:8080/user/verify',
      //POST的请求头是application/json，未来后台可以接收对应的参数，改变请求头
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phoneNum: phoneNum,
        verifyCode: verifyCode
      },


      success: function (res) {
        if (res.data) {
          wx.request({
            url: 'http://localhost:8080/user/register',
            method: "POST",
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded'
            // },
            data: {
              phoneNum: phoneNum,
              regDate: new Date(),
              status: 1
            },
            //用户信息保存成功，页面跳转（充值押金）
            success: function (res) {

              if (res.data) {
                //跳转
                wx.navigateTo({
                  url: '../deposite/deposite',
                })
                // 记录用户信息 
                // 0 未注册 1 绑定 2实名认证
                //更新getApp().globalData中的数据，是更新内存中的数据
                getApp().globalData.status = 1
                getApp().globalData.phoneNum = phoneNum
                //将用户的信息保存到手机存储卡中
                wx.setStorageSync("status", 1)
                wx.setStorageSync("phoneNum", phoneNum)
              } else {//用户信息保存失败
                wx.showModal({
                  title: '提示',
                  content: '服务端错误，请稍后再试',

                })
              }

            }


          })
        } else {
          wx.showModal({
            title: '提示',
            content: '输入的验证码有误！',
            showCancel: false
          })
        }
      }
    })
  }


})