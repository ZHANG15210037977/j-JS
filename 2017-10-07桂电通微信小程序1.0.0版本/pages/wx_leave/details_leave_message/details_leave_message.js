// pages/wx_leave/details_leave_message/details_leave_message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading_key: false,
    request_key:false,
    user_phone :null,
    windo_width:null,
    windo_height: null,
    study_no: null,
    study_name: null,
    leave_start_time: null,
    leave_end_time: null,
    leave_time: null,
    leave_reason: null,
    leave_prove: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=462034052,3829394877&fm=27&gp=0.jpg",
    study_return_id : null,
    form_id : null,
    button_key:true
  },

//请假处理请求提交
request:function(e){
  var start_time_true = this.data.leave_start_time;
  var that = this;
  this.setData({
    loading_key: true
  })
  //0为不批准，1位待审核，2位批准
  var leave_type = '2';
  var key = e.target.dataset.key;
  if(key){
    leave_type = '2';
  }else{
    leave_type = '0';
  }
  wx.request({
    url: 'https://www.mixvjiezi.xyz/wx/wx_leave/teacher_handle_leave.php',
    data: {
      user_phone: that.data.user_phone,
      study_no: that.data.study_no,
      leave_type: leave_type,
      form_id: that.data.form_id,
      touser: that.data.study_return_id,
      access_token: that.data.access_token,
      keyword1: that.data.study_name,
      keyword2: start_time_true,
      keyword3: that.data.leave_end_time,
      keyword4: that.data.leave_time
    },
    success: function (res) {
      if (res.data == 1) {
        that.setData({
          loading_key: false
        })
        wx.showToast({
          title: "处理操作成功",
          icon: 'success',
          duration: 5000,
          mask: true,
          success: function () {
            setTimeout(function () {
              wx.navigateBack()
            }, 2500)
          }
        })
      } else {
        that.setData({
          loading_key: false
        })
        wx.showToast({
          title: res.data,
          image: "../../../imges/error.png",
          duration: 3000
        })
      }
    }
  })

  if (leave_type != '1'){
    that.setData({
      request_key:true
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  //加载传入学生信息
  onLoad: function (options) {
    var that = this;
    this.setData({
      loading_key: true
    })
    var start = options.leave_start_time;
    var end = options.leave_end_time;
    start = start.slice(0, start.lastIndexOf(":"));
    end = end.slice(0, end.lastIndexOf(":"));
    if (options.leave_prove == 'undefined'){
    }else{
      this.setData({
        leave_prove: options.leave_prove
      })
    }

    if (options.leave_type_transmission != '1') {
      that.setData({
        request_key: true
      })
    }
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        that.setData({
          access_token:res.data
        })
      },
    })

  that.setData({
      study_no: options.study_no,
      study_name: options.study_name,
      leave_start_time: start,
      leave_end_time: end,
      leave_time: options.leave_time,
      leave_reason: options.leave_reason,
      user_phone: options.user_phone,
      study_return_id : options.study_return_id,
      form_id : options.form_id,
    })
  if (options.button_key){
    that.setData({
      loading_key: false,
      button_key: false
    })
  }else{
    that.setData({
      loading_key: false,
      button_key: true
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
  
  }
})