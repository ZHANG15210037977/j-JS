// pages/curriculum/teacher/more_curriculumMessage/more_curriculumMessage.js
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
    this.setData({
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
  //自定义函数
  //修改页面跳转函数
  curriculum_modify: function () {
    var id = this.data.listData.id;
    var curriculum_name = this.data.listData.curriculum_name;
    var curriculum_num = this.data.listData.curriculum_num;
    var curriculum_address = this.data.listData.curriculum_address;
    var curriculum_passWord = this.data.listData.curriculum_passWord;

    wx.navigateTo({
      url: "../change_message/change_message?id=" + id + "&curriculum_name=" + curriculum_name + "&curriculum_num=" + curriculum_num + "&curriculum_address=" + curriculum_address + "&curriculum_passWord=" + curriculum_passWord
    })
  }
})