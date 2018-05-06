// register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading_key: false
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
  
  },



  formSubmit:function(e){
    var that = this;
    this.setData({
      loading_key: true
    })
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/register_teacher.php',
      data:{
        user_name: e.detail.value.user_name,
        user_phone: e.detail.value.user_phone,
        user_password: e.detail.value.user_password,
        user_password_again: e.detail.value.user_password_again,
        authorization_code: e.detail.value.authorization_code
      },
      success:function(res){
        if(res.data == 1){
          that.setData({
            loading_key: false
          })
          wx.showToast({
            title: '注册成功',
            icon:'success',
            duration: 5000,
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: "../Land_teacher/P_leave"
                })
              }, 2500)
            }
          })
        }else{
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
  }
})