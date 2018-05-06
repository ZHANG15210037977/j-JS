// pages/curriculum/teacher/index/index.js
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
          "pagePath": "/pages/home_page/teacher/index/index",
          "text": "主页",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/wx_leave/show_leaveMessage/show_leaveMessage",
          "text": "批假",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/lecture/teacher/index/index",
          "text": "讲座",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/curriculum/teacher/index/index",
          "text": "课程",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        }
      ],
      "position": "bottom"
    },
    no_key:true
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

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
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
    that.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_curriculum/index_search.php',
      data: {
        teacher_id: that.data.user_message.teacher_id,
      },
      success: function (res) {
        if (res.data.type == '1') {
          that.setData({
            listData: res.data.data,
          })
        } else {
          that.setData({
            no_key: false
          })
        }
        that.setData({
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
  showMoreMessage: function (e) {
    var id = e.target.dataset.message.id;
    var curriculum_name = e.target.dataset.message.curriculum_name;
    var curriculum_num = e.target.dataset.message.curriculum_num;
    var curriculum_address = e.target.dataset.message.curriculum_address;
    var curriculum_passWord = e.target.dataset.message.curriculum_passWord;

    wx.navigateTo({
      url: "../more_curriculumMessage/more_curriculumMessage?id=" + id + "&curriculum_name=" + curriculum_name + "&curriculum_num=" + curriculum_num + "&curriculum_address=" + curriculum_address + "&curriculum_passWord=" + curriculum_passWord
    })
  },


  check_message:function(e){
    var id = e.currentTarget.dataset.message.id;

    wx.navigateTo({
      url: "../check_message/check_message?id=" + id
    })
  }
})