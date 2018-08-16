const apis = require('../../utils/util.js');
const api = apis.api;
Page({
  data: {
    hotFilmData: [],
    comingSoonData:[]
  },
  //事件处理函数
  fileDetail:function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../filmDetail/filmDetail?id="+id
    })
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
				title: '首页'
			});
    this.getInTheaters();
    this.getComingSoon();
  },
  // 影院热映
  getInTheaters: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.inTheaters,
      method: 'GET',
      data:{
        count:10,
        start:0
      },
      header:{
        "Content-Type":"json"
      },
      success: function(res){
        that.setData({
          hotFilmData: res.data.subjects
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  // 院线即将上映
  getComingSoon: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.comingSoon,
      method: 'GET',
      data: {
        count: 10,
        start: 0
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          comingSoonData: res.data.subjects
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  }
})
