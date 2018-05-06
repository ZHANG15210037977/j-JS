// pages/lecture/teacher/lecture_request/lecture_request.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    window_height: 0,
    leave_type_color: [],
    loading_key: false,
  },
  /**
    * 生命周期函数--监听页面加载 //初始全部加载函数
    */
  onLoad: function (options) {
    var that = this;
    this.setData({
      lecture_id: options.lecture_id,
      lecture_type: options.lecture_type
    })
    //下拉加载读取页面高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          window_height: res.windowHeight
        })
      },
    })

    console.log(options);
    switch (options.lecture_type){
      case "正在进行":
        that.setData({
          switch_key: true,
          request_key_message: '开启'
        })
        break;

        case "1":
        that.setData({
          switch_key: true,
          request_key_message: '开启'
        })
        break;

        default:
        that.setData({
          switch_key: false,
          request_key_message: '关闭'
        })
        break;
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
    this.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_lecture/lecture_request_message.php',
      data: {
        request_type: 1,
        lecture_id: that.data.lecture_id,
        study_no: '0000000000'
      },
      success: function (res) {
        switch (res.data.type) {
          case '1':


            for (var i = 0; i < res.data.data.length; i++) {
              switch (res.data.data[i].study_type) {
                case '0':
                  res.data.data[i].study_type = "未签到";
                  that.data.leave_type_color[i] = 'color:#FF0000';
                  break;
                case '1':
                  res.data.data[i].study_type = "已签到";
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
  //下拉到底重新加载函数
  reLond: function (e) {
    var that = this;
    this.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_lecture/lecture_request_message.php',
      data: {
        request_type: 1,
        lecture_id: that.data.lecture_id,
        study_no: '0000000000'
      },
      success: function (res) {
        switch (res.data.type) {
          case '1':


            for (var i = 0; i < res.data.data.length; i++) {
              switch (res.data.data[i].study_type) {
                case '0':
                  res.data.data[i].study_type = "未签到";
                  that.data.leave_type_color[i] = 'color:#FF0000';
                  break;
                case '1':
                  res.data.data[i].study_type = "已签到";
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
  //查询提交函数
  formSubmit: function (e) {
    var that = this;
    this.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_lecture/lecture_request_message.php',
      data: {
        request_type: 0,
        lecture_id: that.data.lecture_id,
        study_no: e.detail.value.study_no
      },
      success: function (res) {
        switch (res.data.type) {
          case '1':


            for (var i = 0; i < res.data.data.length; i++) {
              switch (res.data.data[i].study_type) {
                case '0':
                  res.data.data[i].study_type = "未签到";
                  that.data.leave_type_color[i] = 'color:#FF0000';
                  break;
                case '1':
                  res.data.data[i].study_type = "已签到";
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

  
  lecture_key_change:function(e){
    //写入状态判断
    var that = this;
    if(e.detail.value){
      var lecture_type = '1'
      that.setData({
        request_key_message: '开启'
      })
    }else{
      var lecture_type = '2'
      that.setData({
        request_key_message: '关闭'
      })
    }
    //获取位置信息
    wx.getLocation({
      success:function(res){
        var lecture_x = res.latitude;
        var lecture_y = res.longitude;
        wx.request({
          url: 'https://www.mixvjiezi.xyz/wx/wx_lecture/lecture_xoy.php',
          data: {
            lecture_type: lecture_type,
            lecture_x: lecture_x,
            lecture_y: lecture_y,
            lecture_id: that.data.lecture_id
          },
          success: function(res) {
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