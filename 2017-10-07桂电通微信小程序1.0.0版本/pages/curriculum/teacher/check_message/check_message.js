// pages/curriculum/teacher/check_message/check_message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    no_key: true,
    listData: [
      {
        message: '一',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '二',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '三',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '四',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '五',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '六',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '七',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '八',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '九',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '十',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '十一',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '十二',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '十三',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '十四',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '十五',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '十六',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '十七',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '十八',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
      {
        message: '十九',
        checkType: 0,
        hidenType: true,
        color: 'background: #D0E3EC;'
      },
      {
        message: '二十',
        checkType: 0,
        hidenType: true,
        color: 'background: #f4f4f4;'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curriculum_id: options
    })
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
    var that = this;
    that.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/check_message.php',
      data: {
        id: that.data.curriculum_id.id,
        request_type: '0',
        num_now: '0'
      },
      success: function (res) {
        var num = res.data[0].check_num;
        if (num != 0) {
          for (var i = 0; i < num; i++) {
            that.data.listData[i].checkType = res.data[0]['check_' + i + 1];
            that.data.listData[i].hidenType = false;
          }
          that.setData({
            checkMessage: res.data[0],
            listData: that.data.listData,
            loading_key: false
          })
        } else {
          that.setData({
            checkMessage: res.data[0],
            listData: that.data.listData,
            loading_key: false,
            no_key: false
          })
        }

      }
    })
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
  //自定义函数们
  //1.签到详情展示函数
  showMore: function (e) {

  }
  ,
  //2.签到增加函数
  addCheck: function () {
    var that = this;
    var num = parseInt(that.data.checkMessage.check_num);
    if (num < 20) {
      that.setData({
        loading_key: true
      })
      wx.request({
        url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/check_message.php',
        data: {
          id: that.data.curriculum_id.id,
          request_type: '1',
          num_now: that.data.checkMessage.check_num
        },
        success: function (res) {
          that.data.checkMessage.check_num = num + 1;
          that.data.listData[num].checkType = 0;
          that.data.listData[num].hidenType = false;
          that.setData({
            checkMessage: that.data.checkMessage,
            listData: that.data.listData,
            loading_key: false,
            no_key: true
          })
        }
      })
    } else {
      wx.showToast({
        title: '已达最大点名次数',
        image: "../../../../imges/error.png",
        duration: 3000
      })
    }
  },

  //签到情况查看函数
  showMore: function (e) {
    var check_id = e.target.dataset.message + 1;
    var sum = "check_" + check_id;
    var check_type = this.data.checkMessage[sum];
    var id = this.data.checkMessage.id;

    wx.navigateTo({
      url: "../check_up/check_up?check_id=" + check_id + "&check_type=" + check_type + "&id=" + id
    })
  }
})