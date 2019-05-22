const app = getApp();
Page({
  data: {
    //article将用来存储towxml数据
    article: {}
  },
  onLoad: function () {
    const _ts = this;

    //请求markdown文件，并转换为内容
    wx.request({
      url: 'https://raw.githubusercontent.com/329213964/329213964.github.io/master/_posts/2019-5-21-%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%96%87%E6%9C%AC%E6%BA%A2%E5%87%BA.md',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(
          res.data,               // `markdown`或`html`文本内容
          'markdown'              // `markdown`或`html`
        );

        //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
        data = app.towxml.initData(data, {
          base: 'https://xxx.com/',    // 需要解析的内容中相对路径的资源`base`地址
          app: _ts                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
        });

        //设置文档显示主题，默认'light'
        data.theme = 'dark';

        //设置数据
        _ts.setData({
          article: data
        });
      }
    });
  }
})