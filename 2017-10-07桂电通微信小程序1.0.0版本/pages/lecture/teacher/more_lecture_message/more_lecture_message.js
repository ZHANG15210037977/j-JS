// pages/lecture/teacher/more_lecture_message/more_lecture_message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.lecture_type == '尚未开始') {
      that.setData({
        listData: options,
        request_key: false
      })
    } else {
      that.setData({
        listData: options,
        request_key: true
      })
    }
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
  //自定义函数
  //修改页面跳转函数
  lecture_modify: function () {
    var lecture_name = this.data.listData.lecture_name;
    var lecture_man = this.data.listData.lecture_man;
    var lecture_time = this.data.listData.lecture_time;
    var lecture_address = this.data.listData.lecture_address;
    var lecture_id = this.data.listData.lecture_id;
    var lecture_y = this.data.listData.lecture_y;
    var lecture_type = this.data.listData.lecture_type;
    var lecture_x = this.data.listData.lecture_x;
    var lecture_introduction = this.data.listData.lecture_introduction;
    
    wx.navigateTo({
      url: "../lecture_modify/lecture_modify?lecture_name=" + lecture_name + "&lecture_man=" + lecture_man + "&lecture_time=" + lecture_time + "&lecture_address=" + lecture_address + "&lecture_id=" + lecture_id + "&lecture_y=" + lecture_y + "&lecture_type=" + lecture_type + "&lecture_x=" + lecture_x + "&lecture_introduction=" + lecture_introduction
    })
  }
})