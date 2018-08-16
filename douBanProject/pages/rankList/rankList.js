// pages/rankList/rankList.js
const apis = require('../../utils/util.js');
const api = apis.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'top250',
    count: 20,
    top250Data:{
      data:[],
      page:0
    },
    publicPraiseData:{
      data: [],
      page: 0
    },
    usBoxData:{
      data: [],
      page: 0
    },
    newMoviesData:{
      data: [],
      page: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '排行榜'
    });
    this.getData(0);
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMoreDataData();
  },
  //事件处理函数
  fileDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../filmDetail/filmDetail?id=" + id
    })
  },
  /*
   *切换tab
   */
  changeTab: function (event) {
    var currentType = event.target.dataset.type;
    if (currentType) {
      this.setData({
        type: currentType
      });
      if (this.data[currentType+'Data'].data.length == 0) {
        this.getData(0);
      }
    }
  },
  getTop250Data(page) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.top250,
      method: 'GET',
      data: {
        count: this.data.count,
        start: page * this.data.count
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var data = that.data.top250Data.data.concat(res.data.subjects);
        that.setData({
          top250Data:{
            data: data,
            page: page
          } 
        });
      },
      complete: function(){
        wx.hideLoading();
      }
    });
  },
  getPublicPraiseData(page) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.publicPraise,
      method: 'GET',
      data: {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        count: this.data.count,
        start: page * this.data.count
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var data = that.data.publicPraiseData.data.concat(res.data.subjects);
        that.setData({
          publicPraiseData: {
            data: data,
            page: page
          }
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  getUsBoxData(page) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.usBox,
      method: 'GET',
      data: {
        count: this.data.count,
        start: page * this.data.count
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var data = that.data.usBoxData.data.concat(res.data.subjects);
        that.setData({
          usBoxData: {
            data: data,
            page: page
          }
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  getNewMoviesData(page) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: api.newMovies,
      method: 'GET',
      data: {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        count: this.data.count,
        start: page * this.data.count
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var data = that.data.newMoviesData.data.concat(res.data.subjects);
        that.setData({
          newMoviesData: {
            data: data,
            page: page
          }
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  getMoreDataData() {
    if (this.data.type === 'top250'){
      var page = this.data[this.data.type + 'Data'].page +1;
      this.getData(page);
    }
  },
  getData(page) {
    var currentType = this.data.type;
    switch (currentType) {
      case 'top250':
        this.getTop250Data(page);
        break;
      case 'publicPraise':
        this.getPublicPraiseData(page);
        break;
      case 'usBox':
        this.getUsBoxData(page);
        break;
      case 'newMovies':
        this.getNewMoviesData(page);
        break;
    }
  }
})