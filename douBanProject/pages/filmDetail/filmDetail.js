// pages/filmDetail/fileDetail.js
const apis = require('../../utils/util.js');
const api = apis.api;
function handleRatingDetail (data) {
  var allCount = 0;
  var array = []
  for (var i in data){
    allCount += data[i];
  }
  for (var i in data) {
    let rate = allCount === 0 ? 0 : (data[i] * 100 / allCount).toFixed(2)
    array.unshift({key: i, rate:rate});
  }
  return array;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    summaryClass: 'summary eclipse-4',
    topImgUrl:'', // 最上面剧照
    aka:[], // 别名
    casts: [], // 演员
    comments_count: '', // 短评数量
    countries: [], // 制片国家/地区
    collect_count: '',//	看过人数
    directors: [], // 导演
    durations: [], // 片长
    genres: [], // 类型
    languages: [], // 语言
    original_title: '', // 原名
    photos:[], // 剧照
    trailers: [], // 预告片
    photos_count: '', // 全部剧照
    popular_reviews: [], // 影评，前10条
    pubdates:[], // 上映时间
    rating:{}, // 评分
    ratings_count: '' ,//	评分人数
    reviews_count:'',//	影评数量
    summary: '', // 简介
    tags:[], // 所属频道
    title:'', // 电影名称
    videos:[], // 播放源
    wish_count:'', // 想看的人数
    writers:[],// 编剧
    year: '' // 年份
  },
  //事件处理函数
  celebrityDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../celebrityDetail/celebrityDetail?id=" + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieData(options.id);
  },
  getMovieData: function (id) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.movieSubject + id,
      method: 'GET',
      data: {
        apikey:'0b2bdeda43b5688921839c8ecb20399b'
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var data = res.data;
        data.rating.details = handleRatingDetail(data.rating.details)
        that.setData({
          topImgUrl: data.images.small,
          aka: data.aka, // 别名
          casts: data.casts, // 演员
          comments_count: data.comments_count, // 短评数量
          countries: data.countries, // 制片国家/地区
          collect_count: data.collect_count,//	看过人数
          directors: data.directors, // 导演
          durations: data.durations, // 片长
          genres: data.genres, // 类型
          languages: data.languages, // 语言
          original_title: data.original_title, // 原名
          photos: data.photos.length > 5 ? data.photos.splice(0, 5) : data.photos, // 剧照
          trailers: data.trailers,
          photos_count: data.photos_count, // 全部剧照
          popular_reviews: data.popular_reviews, // 影评，前10条
          pubdates: data.pubdates, // 上映时间
          rating: data.rating, // 评分
          ratings_count: data.ratings_count,//	评分人数
          reviews_count: data.reviews_count,//	影评数量
          summary: data.summary, // 简介
          tags: data.tags, // 所属频道
          title: data.title, // 电影名称
          videos: data.videos, // 播放源
          wish_count: data.wish_count, // 想看的人数
          writers: data.writers,// 编剧
          year: data.year // 年份
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
    var newClass = has_close ? 'summary' : 'summary  eclipse-4';
    this.setData({
      summaryClass:newClass
    });
  }
})