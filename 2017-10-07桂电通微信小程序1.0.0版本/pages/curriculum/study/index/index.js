// pages/curriculum/study/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: {
      "color": "#699DFD",
      "selectedColor": "#ff0000",
      "backgroundColor": "linear-gradient(90deg,#4e8efc,#38b9fd)",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/home_page/study/index/index",
          "text": "主页",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/wx_leave/study/index",
          "text": "请假",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/lecture/study/index/index",
          "text": "讲座",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/curriculum/study/index/index",
          "text": "课程",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: true
        }
      ],
      "position": "bottom"
    },
    no_key: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cache = wx.getStorageSync('user');
    that.setData({
      user_message: cache,
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
      url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/study_index_search.php',
      data: {
        study_no: that.data.user_message.study_no,
      },
      success: function (res) {
        if (res.data.type == '1') {
          that.setData({
            listData: res.data.data,
          })
        } else {
          that.setData({
            no_key: false
          })
        }
        that.setData({
          loading_key: false
        })
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
  //1.学生签到页面传送函数
  check_message:function(e){
    var id = e.currentTarget.dataset.message.id;
    var check_num = e.currentTarget.dataset.message.check_num;

    wx.navigateTo({
      url: "../check_message/check_message?id=" + id + "&check_num=" + check_num
    })
  }
})