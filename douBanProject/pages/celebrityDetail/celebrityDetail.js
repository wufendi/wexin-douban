// pages/celebrityDetail/celebrityDetail.js
const apis = require('../../utils/util.js');
const api = apis.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    summaryClass: 'summary eclipse-4',
    topImgUrl: '', // 最上面剧照
    aka: '', // 别名
    aka_en: '', // 英文别名
    name: '',
    name_en: '',
    gender: '', // 性别
    born_place: '', // 出生地
    constellation: '', // 星座
    professions: '', // 职业
    summary: '', // 简介
    birthday: '',
    photos: [], // 影人剧照，最多10张
    works: [] // 影人作品，最多5部，简版电影条目结构
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
    if (options.id) {
      this.getMovieData(options.id);
    }
  },
  getMovieData: function (id) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.movieCelebrity + id,
      method: 'GET',
      data: {
        apikey: '0b2bdeda43b5688921839c8ecb20399b'
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var data = res.data;
        that.setData({
          topImgUrl: data.avatars.small,
          aka: data.aka.join('/'), // 别名
          aka_en: data.aka_en.join('/'), // 英文别名
          name: data.name,
          name_en: data.name_en,
          gender: data.gender, // 性别
          born_place: data.born_place, // 出生地
          constellation: data.constellation, // 星座
          professions: data.professions.join('/'), // 职业
          summary: data.summary, // 简介
          birthday: data.birthday,
          photos: data.photos, // 影人剧照，最多10张
          works: data.works // 影人作品，最多5部，简版电影条目结构
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  summaryTap: function (event) {
    var summaryClass = this.data.summaryClass;
    var has_close = summaryClass.indexOf('eclipse-4') != -1;
    var newClass = has_close ? '' : 'eclipse-4';
    this.setData({
      summaryClass: newClass
    });
  }
})