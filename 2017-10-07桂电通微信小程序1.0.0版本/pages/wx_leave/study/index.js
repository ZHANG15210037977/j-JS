// pages/wx_leave/study/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: {
      "color": "#699DFD",
      "selectedColor": "#ff0000",
      "backgroundColor": "linear-gradient(180deg,#4e8efc,#38b9fd)",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/home_page/study/index/index",
          "text": "主页",
          "iconPath": "../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/wx_leave/study/index",
          "text": "请假",
          "iconPath": "../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: true
        },
        {
          "pagePath": "/pages/lecture/study/index/index",
          "text": "讲座",
          "iconPath": "../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/curriculum/study/index/index",
          "text": "课程",
          "iconPath": "../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        }
      ],
      "position": "bottom"
    },
    listData: null,
    leave_type_color: [],
    loading_key: false,
    study_message: null,
    window_height: 0,
    no_key:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cache = wx.getStorageSync('user');
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          study_message: cache,
          window_height: res.windowHeight
        })
      },
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
    wx.request({
      url: "https://www.mixvjiezi.xyz/wx/wx_leave/index_onLoad.php",
      data: {
        study_no: that.data.study_message.study_no
      },
      success: function (res) {
        console.log(res.data)
        switch (res.data.type) {
          case '1':


            that.setData({
              listData: res.data.data
            })

            for (var i = 0; i < res.data.data.length; i++) {
              var key = that.data.listData[i].leave_type;
              switch (key) {
                case '0':
                  that.data.listData[i].leave_type = "不予准假";
                  that.data.leave_type_color[i] = 'color:#FF0000';
                  break;
                case '1':
                  that.data.listData[i].leave_type = "待审核";
                  that.data.leave_type_color[i] = 'color:#0000FF';
                  break;
                case '2':
                  that.data.listData[i].leave_type = "给予准假";
                  that.data.leave_type_color[i] = 'color:#79AD8C';
                  break;
              }

            }
            that.setData({
              listData: that.data.listData,
              leave_type_color: that.data.leave_type_color,
              loading_key: false,
              no_key: true
            })
            break;

          case '2':
            wx.showToast({
              title: res.data.data,
              image: "../../../../imges/error.png",
              duration: 3000
            })
            that.setData({
              loading_key: false
            })
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


  //自定义函数

  /**
   * 下拉加载函数
   */
  reLond: function (e) {
    var that = this;
    this.setData({
      loading_key: true
    })
    wx.request({
      url: "https://www.mixvjiezi.xyz/wx/wx_leave/index_onLoad.php",
      data: {
        study_no: that.data.study_message.study_no
      },
      success: function (res) {
        switch (res.data.type) {
          case '1':
            that.setData({
              listData: res.data.data
            })
            for (var i = 0; i < res.data.data.length; i++) {
              var key = that.data.listData[i].leave_type;
              switch (key) {
                case '0':
                  that.data.listData[i].leave_type = "不予准假";
                  that.data.leave_type_color[i] = 'color:#FF0000';
                  break;
                case '1':
                  that.data.listData[i].leave_type = "待审核";
                  that.data.leave_type_color[i] = 'color:#0000FF';
                  break;
                case '2':
                  that.data.listData[i].leave_type = "给予准假";
                  that.data.leave_type_color[i] = 'color:#79AD8C';
                  break;
              }

            }
            that.setData({
              listData: that.data.listData,
              leave_type_color: that.data.leave_type_color,
              loading_key: false,
              no_key: true
            })
            break;

          case '2':
            wx.showToast({
              title: res.data.data,
              image: "../../../../imges/error.png",
              duration: 3000
            })
            that.setData({
              loading_key: false
            })
        }
      }
    })
  },
  //详细信息跳转函数
  showMoreMessage: function (e) {
    var study_no = e.target.dataset.message.study_no;
    var study_name = e.target.dataset.message.study_name;
    var leave_start_time = e.target.dataset.message.leave_start_time;
    var leave_end_time = e.target.dataset.message.leave_end_time;
    var leave_time = e.target.dataset.message.leave_time;
    var leave_reason = e.target.dataset.message.leave_reason;
    var leave_prove = e.target.dataset.message.leave_prove;
    var study_return_id = e.target.dataset.message.study_return_id;
    var form_id = e.target.dataset.message.form_id;
    var leave_type_transmission;
    var user_phone = this.data.user_phone;
    var button_key = '';

    switch (e.target.dataset.message.leave_type) {
      case '不予准假':
        leave_type_transmission = "0";
        break;
      case '待审核':
        leave_type_transmission = "1";
        break;
      case '给予准假':
        leave_type_transmission = "2";
        break;
    }

    wx.navigateTo({
      url: "../details_leave_message/details_leave_message?study_no=" + study_no + "&study_name=" + study_name +
      "&leave_start_time=" + leave_start_time + "&leave_end_time=" + leave_end_time + "&leave_time=" + leave_time +
      "&leave_reason=" + leave_reason + "&leave_prove=" + leave_prove + "&user_phone=" + user_phone
      + "&leave_type_transmission=" + leave_type_transmission + "&study_return_id=" + study_return_id + "&form_id=" + form_id + "&button_key=" + button_key
    })
  },

})



