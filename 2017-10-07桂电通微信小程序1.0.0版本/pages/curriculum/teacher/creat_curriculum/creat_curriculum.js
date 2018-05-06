
// pages/lecture/teacher/creat_lecture/creat_lecture.js   
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

  //1.表单提交函数
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.curriculum_passWord == e.detail.value.curriculum_passWord_again) {
      this.setData({
        loading_key: true
      })
      wx.request({
        url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/creat_curriculum.php',
        data: {
          curriculum_name: e.detail.value.curriculum_name,
          curriculum_num: e.detail.value.curriculum_num,
          curriculum_address: e.detail.value.curriculum_address,
          curriculum_passWord: e.detail.value.curriculum_passWord,
          teacher_name:that.data.user_message.teacher_name,
          teacher_id: that.data.user_message.teacher_id,
          curriculum_type:'0'
        },
        success: function (res) {
          if (res.data == 1) {
            that.setData({
              loading_key: false
            })
            wx.showToast({
              title: "课程创建成功",
              icon: 'success',
              duration: 3000,
              mask: true,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
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
    }else{
      wx.showToast({
        title: '密匙输入不一致',
        image: "../../../../imges/error.png",
        duration: 3000
      })
    }
  }
})


//工具函数们
//1.讲座时间校验函数
