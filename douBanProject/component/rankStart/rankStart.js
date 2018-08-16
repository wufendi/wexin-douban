// component/rankStart/rankStart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startRank: {
      type: Number,
      value: 5,
      observer: function (newVal, oldVal) {
       if (newVal !== oldVal) {
         this.setData({
           startArray: new Array(newVal)
         })
       }
      }
    },
    rate: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.setData({
            rateString: newVal + '%'
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    startArray: new Array(5),
    rateString: '100%'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
