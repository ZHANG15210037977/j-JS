// pages/public/Land_study/Land_study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  formSubmit: function (e) {
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/land_study.php',
      data: {
        study_no:e.detail.value.study_no,
        study_password: e.detail.value.study_password
      },
      success: function (res) {
        switch(res.data.type){
          case '1':
            wx.navigateTo({
              url: "../../home_page/study/index/index"
            })
            wx.setStorage({
              key: 'user',
              data: res.data.data
            })
            break;
            case '2':
            wx.showToast({
              title: res.data.data,
              image: "../../../imges/error.png",
              duration: 3000
            })
            break;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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