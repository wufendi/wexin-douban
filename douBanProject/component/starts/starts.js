// component/starts/starts.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stars: {
      type: Number,
      value:0,
      observer: function (newVal, oldVal) { 
       var has_half = newVal%10 === 5?true: false;
       var rank = Math.floor(newVal/10);
       var stars_array = [];
       for (var i=0;i<5;i++){
         if (i < rank) {
           stars_array.push('icon-star yellow');
         } else {
           if (has_half) {
             if (i === rank) {
               stars_array.push('icon-half-star yellow')
             } else {
               stars_array.push('icon-star');
             }
           } else {
             stars_array.push('icon-star');
           }
         }
       }
       this.setData({
         starsArray: stars_array
       })
      }
    },
    average: {
      type:Number,
      value:'',
      observer: function (newVal, oldVal) {
        this.setData({
          rank: newVal.toFixed(1)
        })
      }
    },
    rankShow:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    starsArray:[],
    rank:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
