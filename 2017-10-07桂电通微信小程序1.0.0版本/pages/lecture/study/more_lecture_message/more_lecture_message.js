// pages/lecture/teacher/more_lecture_message/more_lecture_message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled_key:false
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
  //报名函数
  lecture_modify: function () {
    var that = this;
    that.setData({
      loading_key: true,
      disabled_key: true
    })


    var cache = wx.getStorageSync('user');
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          study_message: cache,
        })
      },
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_lecture/study_lecture_up.php',
      data:{
        study_name: that.data.study_message.study_name,
        study_no: that.data.study_message.study_no,
        lecture_id: that.data.listData.lecture_id
      },
      success:function(res){
        if (res.data == 1) {
          that.setData({
            loading_key: false
          })
          wx.showToast({
            title: "报名成功",
            icon: 'success',
            duration: 3000,
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 2500)
            }
          })
        } else {
          that.setData({
            loading_key: false
          })
          wx.showToast({
            title: res.data,
            image: "../../../../imges/error.png",
            duration: 3000
          })
        }
      }
    })
  }
})