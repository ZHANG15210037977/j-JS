//拓展Date对象，将时间戳转换成标准时间格式（yyyy-mm-dd hh-ss)
Date.prototype.Format = function (fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1, //月份   
    "d+": this.getDate(), //日   
    "h+": this.getHours(), //小时   
    "m+": this.getMinutes(), //分   
    "s+": this.getSeconds(), //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
} 
//app.js
App({

  config: {
    host: 'www.mixvjiezi.xyz/wx'
  },

  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取access_token
    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/access_token_And_openid.php',
      data:{
        grant_type:'client_credential'
      },
      success:function(res){
        wx.setStorage({
          key: 'access_token',
          data: res.data
        })
      }
    }),
    //获取openid
    wx.login({
      success:function(res){
        if(res.code){
          wx.request({
            url: 'https://www.mixvjiezi.xyz/wx/access_token_And_openid.php',
            data: {
              grant_type: 'authorization_code',
              js_code:res.code
            },
            success: function (res) {
              wx.setStorage({
                key: 'openid',
                data: res.data
              })
            }
          })
        }
      }
    })

  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
  }
})
