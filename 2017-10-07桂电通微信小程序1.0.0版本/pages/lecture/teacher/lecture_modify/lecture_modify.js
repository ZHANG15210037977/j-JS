// pages/lecture/teacher/lecture_modify/lecture_modify.js
// pages/lecture/teacher/creat_lecture/creat_lecture.js   
var startDate = 0;
var startTimes = 0;
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
    this.setData({
      listData: options
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

  /**
     * 自定义函数们
     */
  //1.开始日期切换函数
  startDateChange: function (e) {
    var that = this;
    startDate = e.detail.value;
    that.setData({
      startDate: e.detail.value
    })
    var lecture_time = startDate + ' ' + startTimes;
    var lecture_time = startDate + ' ' + startTimes;
    if (startDate && startTimes) {
      var lecture_time = lecture_time_calculation(lecture_time);
      if (lecture_time) {
        that.setData({
          lecture_time: lecture_time
        })
      } else {
        wx.showToast({
          title: '日期已过或太短',
          image: "../../../../imges/error.png",
          duration: 3000
        })
        that.setData({
          leaveDates: null
        })
      }
    }
  },
  //2.开始时间切换函数
  startTimeChange: function (e) {
    var that = this;
    startTimes = e.detail.value;
    that.setData({
      startTimes: e.detail.value
    })
    var lecture_time = startDate + ' ' + startTimes;
    if (startDate && startTimes) {
      var lecture_time = lecture_time_calculation(lecture_time);
      if (lecture_time) {
        that.setData({
          lecture_time: lecture_time
        })
      } else {
        wx.showToast({
          title: '日期已过或太短',
          image: "../../../../imges/error.png",
          duration: 3000
        })
        that.setData({
          leaveDates: null
        })
      }
    }
  },
  //3.表单提交函数
  formSubmit: function (e) {
    var that = this;
    this.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_lecture/creat_lecture.php',
      data: {
        lecture_name: e.detail.value.lecture_name,
        lecture_man: e.detail.value.lecture_man,
        lecture_time: that.data.lecture_time,
        lecture_address: e.detail.value.lecture_address,
        lecture_introduction: e.detail.value.lecture_introduction,
        lecture_id: that.data.listData.lecture_id,        
        request_type:1
      },
      success: function (res) {
        if (res.data == 1) {
          that.setData({
            loading_key: false
          })
          wx.showToast({
            title: "请假信息已修改",
            icon: 'success',
            duration: 3000,
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 2
                })
              }, 1500)
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


//工具函数们
//1.讲座时间校验函数
function lecture_time_calculation(ftm) {
  ftm = ftm.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
  var nowData = new Date();
  var lectureTime = new Date(ftm);
  if ((lectureTime - nowData) > 0) {
    return ftm;
  } else {
    return false;
  }
}