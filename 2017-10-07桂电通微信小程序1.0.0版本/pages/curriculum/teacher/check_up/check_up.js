// pages/curriculum/teacher/check_up/check_up.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leave_type_color: [],
    loading_key: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      check_id: options.check_id,
      check_type: options.check_type,
      id: options.id,
    })
    //下拉加载读取页面高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          window_height: res.windowHeight
        })
      },
    })


    if (options.check_type == "1") {
      that.setData({
        switch_key: true,
        request_key_message: '开启'
      })
    } else {
      that.setData({
        switch_key: false,
        request_key_message: '关闭'
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

    var that = this;
    var sum = 'check_' + that.data.check_id
    this.setData({
      loading_key: true,
      sums: sum
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/check_up_message.php',
      data: {
        request_type: 1,
        id: that.data.id,
        study_no: '0000000000'
      },
      success: function (res) {
        switch (res.data.type) {
          case '1':


            for (var i = 0; i < res.data.data.length; i++) {
              switch (res.data.data[i][sum]) {
                case '0':
                  res.data.data[i][sum] = "未签到";
                  that.data.leave_type_color[i] = 'color:#FF0000';
                  break;
                case '1':
                  res.data.data[i][sum] = "已签到";
                  that.data.leave_type_color[i] = 'color:#3AD315';
                  break;
              }

            }
            that.setData({
              listData: res.data.data,
              leave_type_color: that.data.leave_type_color,
              loading_key: false,
              no_key: true
            })
            break;
          case '0':
            wx.showToast({
              title: res.data.data[0],
              image: "../../../../imges/error.png",
              duration: 3000
            })
            that.setData({
              loading_key: false,
              no_key: false
            })
            break;
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

  //学号检索学生签到状况函数
  formSubmit: function (e) {


    var that = this;
    var sum = 'check_' + that.data.check_id
    this.setData({
      loading_key: true,
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/check_up_message.php',
      data: {
        request_type: 0,
        id: that.data.id,
        study_no: e.detail.value.study_no
      },
      success: function (res) {
        switch (res.data.type) {
          case '1':


            for (var i = 0; i < res.data.data.length; i++) {
              switch (res.data.data[i][sum]) {
                case '0':
                  res.data.data[i][sum] = "未签到";
                  that.data.leave_type_color[i] = 'color:#FF0000';
                  break;
                case '1':
                  res.data.data[i][sum] = "已签到";
                  that.data.leave_type_color[i] = 'color:#3AD315';
                  break;
              }

            }
            that.setData({
              listData: res.data.data,
              leave_type_color: that.data.leave_type_color,
              loading_key: false,
              no_key: true
            })
            break;
          case '0':
            wx.showToast({
              title: res.data.data[0],
              image: "../../../../imges/error.png",
              duration: 3000
            })
            that.setData({
              loading_key: false,
              no_key: false,
              listData: null
            })
            break;
        }
      }
    })
  },

  //签到状态改变函数
  lecture_key_change: function (e) {
    //写入状态判断
    var that = this;
    if (e.detail.value) {
      var types = '1'
      that.setData({
        request_key_message: '开启'
      })
    } else {
      var types = '2'
      that.setData({
        request_key_message: '关闭'
      })
    }
    //获取位置信息
    wx.getLocation({
      success: function (res) {

        var numn = 'check_' + that.data.check_id
        var curriculum_x_s = res.latitude;
        var curriculum_y_s = res.longitude;
        wx.request({
          url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/check_up_xoy.php',
          data: {
            curriculum_type: types,
            curriculum_x: curriculum_x_s,
            curriculum_y: curriculum_y_s,
            check_id:numn,
            id: that.data.id,
          },
          success: function (res) {
            if (res.data == 1) {
              wx.showToast({
                title: "签到状态已更改",
                icon: 'success',
                duration: 3000
              })
            } else {
              wx.showToast({
                title: res.data,
                image: "../../../../imges/error.png",
                duration: 3000
              })
            }
          },
        })
      }
    })
  }
})