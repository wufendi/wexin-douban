// pages/search/search.js
const apis = require('../../utils/util.js');
const api = apis.api;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keywords:'',
    start:0,
    count:20,
    tags:[],
    total:20,
    isTag:false,
    isMore:false,
    resultData:[],
    historyData: []
  },

  //事件处理函数
  fileDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../filmDetail/filmDetail?id=" + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchTag();
    var historyData = [];
    var that  = this;
    wx.getStorage({
      key: 'searchHistoryData',
      success: function (res) {
        var data = res.data
        var index = data.indexOf(null);
        if (index!=-1) {
          data.splice(index, 1);
        }
        that.setData({
          historyData: data
        });
      }
    });
   
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var start = this.data.start + 1;
    var count = this.data.count;
    var total = this.data.total;
    if (total > (start*count) && !this.data.isMore) {
      this.getSearchMovie(start);
    }
  },
  bindKeywords: function (e) {
    this.setData({
      keywords: e.detail.value,
      isTag: false,
      resultData:[]
    });
    if (e.detail.value) {
      this.getSearchMovie(0);
    }
  },
  bindDeleteKeywords: function () {
    this.setData({
      keywords: ''
    });
  },
  bindKeywordsBlur: function (e) {
    var value = e.detail.value;
    if (value) {
      this.setHistoryData(value);
    }
  },
  setHistoryData:function(value){
    var data = [].concat(this.data.historyData);
    var index = data.indexOf(value);
    if (index != -1) {
      data.splice(index, 1);
    }
    data.unshift(value);
    if (data.length > 10) {
      data.splice(10, 1);
    }
    this.setData({
      historyData: data
    });
    wx.setStorage({
      key: "searchHistoryData",
      data: data
    });
  },
  bindSearchHistory: function (event) {
    var keyword = event.target.dataset.keyword;
    var isCancel = event.target.dataset.cancel;
    if (keyword && !isCancel) {
      this.setData({
        keywords: keyword,
        isTag: false,
        resultData: []
      });
      this.getSearchMovie(0);
    } else if(isCancel){
      var data = [].concat(this.data.historyData);
      var index = data.indexOf(keyword);
      if (index != -1) {
        data.splice(index, 1);
        this.setData({
          historyData: data
        });
        wx.setStorage({
          key: "searchHistoryData",
          data: data
        });
      }
    }
  },
  bindSearchTag: function (event) {
    var tag = event.target.dataset.tag;
    if (tag) {
      this.setData({
        keywords: tag,
        isTag:true,
        resultData: []
      });
      this.getSearchMovie(0);
      this.setHistoryData(tag);
    }
  },
  /**
   * 获取电影标签
   */
  getSearchTag: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.searchTag,
      method: 'GET',
      data: {
        type: 'movie'
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            tags: res.data.tags
          });
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  /*
   *获取电影搜索
   */
  getSearchMovie: function(start) {
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      isMore: true
    });
    var that = this;
    var keys = this.data.isTag ? 'tag':'q';
    var data = {
      start: start*this.data.count,
      count: this.data.count,
    };
    data[keys] = this.data.keywords;
    wx.request({
      url: api.searchMovie,
      method: 'GET',
      data: data,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var data = [];
          if (start == 0) {
            data = res.data.subjects
          } else {
            data = that.data.resultData.concat(res.data.subjects);
          }
          that.setData({
            resultData: data,
            start: start,
            total: res.data.total
          });
        }
      },
      complete: function () {
        wx.hideLoading();
        that.setData({
          isMore: false
        });
      }
    });
  }
})