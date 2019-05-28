// miniprogram/pages/home/guarantee/guarantee.js
var myUtils = require("../../../utils/myUtils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 最大字符数
    maxTextLen: 200,
    // 默认长度
    textLen: 0,
    info:"",
    address:"",
    addresslist:[]
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
    if (myUtils.get("login_status") == 0 || myUtils.get("login_status") ==null){
      wx.redirectTo({
        url: '../login/login',
      })
      return;
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var address=myUtils.get("choose_address");
      if(address!=null){
        this.setData({
          address:address
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
        info:e.detail.value,
        maxTextLen: maxTextLen,
        textLen: textLen
    });
    
  },
  chooseAddress:function(e){
    wx.redirectTo({
      url: './chooseAddress',
    })
  },
  employSubmit:function(e){
    if(this.data.address==null||this.data.address==""||
    this.data.info==null||this.data.info==""){
      wx.showModal({
        title: '提示',
        content: '不可留空',
        showCancel: false
      })
      return;
    }else{
      var timestamp = Date.parse(new Date());  
      var date = new Date(timestamp); 
      var year = date.getFullYear()
      var month = date.getMonth()+1; 
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      
      var time = year + "-" + month + "-" + day + " " + hour + ":" + minute;
      console.log(time);

      wx.request({
        url: 'https://fix.foxcii.com/employ/addEmploy',
        //定义传到后台的数据
        data: {
          //从全局变量data中获取数据
          employInfo:this.data.info,
          employTime:time,
          employAddress: this.data.address,
          userid: myUtils.get("userid")
          
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
            getApp().globalData.choose_address =null;
            wx.setStorageSync("choose_address", null);
            wx.switchTab({
              url: '../home'
            })
            wx.showToast({
              title: '提交成功',
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