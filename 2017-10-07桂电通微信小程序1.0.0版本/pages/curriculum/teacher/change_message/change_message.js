// pages/curriculum/teacher/change_message/change_message.js
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
    var cache = wx.getStorageSync('user');
    this.setData({
      user_message: cache,
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
  //自定义函数们

  //1.表单提交函数
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.curriculum_passWord_again == e.detail.value.curriculum_passWord){
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
          teacher_name: that.data.user_message.teacher_name,
          teacher_id: that.data.listData.id,
          curriculum_type: 1
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
    } else {
      wx.showToast({
        title: '密匙输入不一致',
        image: "../../../../imges/error.png",
        duration: 3000
      })
    }
  }
})