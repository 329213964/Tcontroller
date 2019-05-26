// miniprogram/pages/home/phone/phone.js
var myUtils = require("../../../utils/myUtils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["86", "80", "84", "87"],
    countryCodeIndex: 0,
    phoneNum: "",
    isclick:false,
    isnum: 'weui-vcode-btn',
    isnumtext:'获取验证码',
    cooldownNum:60,
    timer:'cd',
    iscode:""
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
    if(this.data.isclick)return;

    this.cooldown()
      //获取国家代码的索引
      var index = this.data.countryCodeIndex;
      //根据索引取值
      var countryCode = this.data.countryCodes[index];
      //获取输入的手机号
      var phoneNum = this.data.phoneNum;
      // console.log(countryCode,phoneNum) 
      //想后台发送请求
      var iscode='';
      iscode = iscode + Math.floor(Math.random() * 10);
      iscode = iscode + Math.floor(Math.random() * 10);
      iscode = iscode + Math.floor(Math.random() * 10);
      iscode = iscode + Math.floor(Math.random() * 10);
      wx.request({
        //小程序访问的网络请求协议必须是https，url里面不能有端口号
        url: "https://v.juhe.cn/sms/send",
        //传递的参数
        data: {
          mobile: phoneNum,
          tpl_id:122680,
          tpl_value:'%23code%23%3D'+iscode,
          type:'',
          key:'4493b3bf7cc88395f59b6b6c6fca181e'
        },
        //发送请求的方式
        method: 'GET',
        success: function (res) {
          if(res.data.error_code==205401){
            wx.showModal({
              title: '提示',
              content: '手机号不正确',
              showCancel: false
            })
            return;
          }
          wx.showToast({
            title: '已发送，请查收!',
            duration: 2000,

          })
           console.log(res)
        }

      })
     
      this.setData({
        iscode:iscode,
        isclick: true,
        isnum: 'weui-vcode-btn-clicked',
        isnumtext: '已发送(' + this.data.cooldownNum + 's)'
      })

    
    
    
  },
  cooldown:function(){
    var that=this;
    var cooldownNum = that.data.cooldownNum;
    that.setData({
      cd:setInterval(function(){
        cooldownNum--; 
        if (cooldownNum == 0) {
          clearInterval(that.data.cd);
          cooldownNum = 60;
          that.data.isclick=false;
          that.data.isnum= 'weui-vcode-btn';
          that.data.isnumtext ='获取验证码'
        }else{
          that.data.isnumtext = '已发送(' + cooldownNum +'s)'
        }
        that.setData({
          cooldownNum:cooldownNum,
          isnumtext: that.data.isnumtext,
          isclick: that.data.isclick,
          isnum: that.data.isnum
        })
        
      },1000)
    })
  },

  formSubmit: function (e) {
    var phoneNum = e.detail.value.phoneNum;
    var verifyCode = e.detail.value.verifyCode;
    var iscode=this.data.iscode;
    var userid = myUtils.get("userid");

    if(verifyCode==iscode){
      wx.request({
        url: 'https://fix.foxcii.com/user/bindPhoneNum',
        //定义传到后台的数据
        data: {
          //从全局变量data中获取数据
          userid: userid,
          userPhone: phoneNum
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
              content: '手机号已被注册',
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
            //-------------- 手机号绑定成功，获得的注册信息进行相应处理--------------


            // -------------------------------------------------------------
            wx.redirectTo({
              url: '../login/login'　　// 手机号绑定成功，跳转到页面
            })

          }

        },
        fail: function (res) {
          console.log("调用API失败");
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '输入的验证码有误！',
        showCancel: false
      })
    }
    
  }


})