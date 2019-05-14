
//value
function get(key) {
  //磁盘
  var value = wx.getStorageSync(key)
  //没有取到
  if (!value) {
    //内存
    value = getApp().globalData[key];
  }
  return value;
}

module.exports = {
  get
}