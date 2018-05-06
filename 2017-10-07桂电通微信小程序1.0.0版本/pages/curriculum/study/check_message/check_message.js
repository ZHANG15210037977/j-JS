// pages/curriculum/study/check_message/check_message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    up_key: false,
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
    var that = this;
    var cache = wx.getStorageSync('user');
    that.setData({
      user_message: cache,
      curriculum_message: options
    })

    var num = that.data.curriculum_message.check_num;
    if (num != 0) {

      for (var i = 0; i < num; i++) {
        that.data.listData[i].hidenType = false;
      }
      that.setData({
        listData: that.data.listData,
        loading_key: false
      })

    } else {
      that.setData({
        loading_key: false,
        no_key: false
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
    that.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/study_check_message.php',
      data: {
        id: that.data.curriculum_message.id,
        study_no: that.data.user_message.study_no,
        request_type: '0'
      },
      success: function (res) {
        for (var i = 0; i < 20; i++) {
          var  n = i + 1;
          if (res.data[0]['check_' + n] == '1'){
            that.data.listData[i].checkType = true;
          }else{
            that.data.listData[i].checkType = false;
          }
        }
        that.setData({
          checkMessage: res.data[0],
          listData: that.data.listData,
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
  //1.签到列表刷新函数
  refresh_Check: function (e) {
    var that = this;
    that.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/study_check_message.php',
      data: {
        id: that.data.curriculum_message.id,
        study_no: that.data.user_message.study_no,
        request_type: '1'
      },
      success: function (res) {
        var num = res.data[0].check_num;
        if (num != 0) {

          for (var i = 0; i < num; i++) {
            that.data.listData[i].hidenType = false;
          }
          that.setData({
            listData: that.data.listData,
            loading_key: false
          })

        } else {
          that.setData({
            loading_key: false,
            no_key: false
          })
        }

      }
    })
  },//签到函数
  check_function:function(e){
    var that = this;
    var check_nos = e.currentTarget.dataset.message + 1;
    var check_noe = e.currentTarget.dataset.message;
    that.setData({
      loading_key: true
    })
    wx.getLocation({
      success: function (res) {
        var curriculum_x = res.latitude;
        var curriculum_y = res.longitude;
        wx.request({
          url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/study_check.php',
          data: {
            study_x: curriculum_x,
            study_y: curriculum_y,
            check_no: check_nos,
            id: that.data.curriculum_message.id,
            study_no: that.data.user_message.study_no,
          },
          success: function (res) {
            if (res.data == 1) {

              that.data.checkMessage['check_' + check_nos] = '1';
              that.data.listData[check_noe].checkType = true;

              that.setData({
                checkMessage: that.data.checkMessage,
                listData: that.data.listData,
                loading_key: false,
              })
              wx.showToast({
                title: '签到成功',
                icon: 'success',
                duration: 3000
              })

            } else {
              that.setData({
                loading_key: false,
              })
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