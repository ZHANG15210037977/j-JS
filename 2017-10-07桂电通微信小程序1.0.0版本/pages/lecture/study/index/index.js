// pages/lecture/study/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: {
      "color": "#699DFD",
      "selectedColor": "#ff0000",
      "backgroundColor": "linear-gradient(90deg,#4e8efc,#38b9fd)",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/home_page/study/index/index",
          "text": "主页",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/wx_leave/study/index",
          "text": "请假",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/lecture/study/index/index",
          "text": "讲座",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: true
        },
        {
          "pagePath": "/pages/curriculum/study/index/index",
          "text": "课程",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        }
      ],
      "position": "bottom"
    },
    leave_type_color: [],
    no_key: true
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          loading_key: true,
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
      url: 'https://www.mixvjiezi.xyz/wx/wx_lecture/teacher_show_lecture_list.php',
      data: {
        request_type: '0'
      },
      success: function (res) {
        if(res.data != 3){
          for (var i = 0; i < res.data.length; i++) {
            switch (res.data[i].lecture_type) {
              case '0':
                res.data[i].lecture_type = "尚未开始";
                that.data.leave_type_color[i] = 'color:#0000FF';
                break;
              case '1':
                res.data[i].lecture_type = "正在进行";;
                that.data.leave_type_color[i] = 'color:#3AD315';
                break;
              case '2':
                res.data[i].lecture_type = "已经结束";
                that.data.leave_type_color[i] = 'color:#FF0000';
                break;
            }
          }

          that.setData({
            listData: res.data,
            leave_type_color: that.data.leave_type_color,
            loading_key: false
          })
        }else{
          that.setData({
            listData: null,
            loading_key: false,
            no_key: false
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
  show_more: function () {
    wx.navigateTo({
      url: "../creat_lecture/creat_lecture"
    })
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
      url: 'https://www.mixvjiezi.xyz/wx/wx_lecture/teacher_show_lecture_list.php',
      data: {
        request_type: '0'
      },
      success: function (res) {
        if (res.data != 3) {
          for (var i = 0; i < res.data.length; i++) {
            switch (res.data[i].lecture_type) {
              case '0':
                res.data[i].lecture_type = "尚未开始";
                that.data.leave_type_color[i] = 'color:#0000FF';
                break;
              case '1':
                res.data[i].lecture_type = "正在进行";;
                that.data.leave_type_color[i] = 'color:#3AD315';
                break;
              case '2':
                res.data[i].lecture_type = "已经结束";
                that.data.leave_type_color[i] = 'color:#FF0000';
                break;
            }
          }

          that.setData({
            listData: res.data,
            leave_type_color: that.data.leave_type_color,
            loading_key: false
          })
        } else {
          that.setData({
            listData: null,
            loading_key: false,
            no_key: false
          })
        }
      }
    })
  },
  //详细信息跳转函数
  showMoreMessage: function (e) {
    var lecture_name = e.currentTarget.dataset.message.lecture_name;
    var lecture_man = e.currentTarget.dataset.message.lecture_man;
    var lecture_time = e.currentTarget.dataset.message.lecture_time;
    var lecture_address = e.currentTarget.dataset.message.lecture_address;
    var lecture_id = e.currentTarget.dataset.message.lecture_id;
    var lecture_y = e.currentTarget.dataset.message.lecture_y;
    var lecture_type = e.currentTarget.dataset.message.lecture_type;
    var lecture_x = e.currentTarget.dataset.message.lecture_x;
    var lecture_introduction = e.currentTarget.dataset.message.lecture_introduction;

    wx.navigateTo({ 
      url: "../more_lecture_message/more_lecture_message?lecture_name=" + lecture_name + "&lecture_man=" + lecture_man + "&lecture_time=" + lecture_time + "&lecture_address=" + lecture_address + "&lecture_id=" + lecture_id + "&lecture_y=" + lecture_y + "&lecture_type=" + lecture_type + "&lecture_x=" + lecture_x + "&lecture_introduction=" + lecture_introduction
    })
  },

})