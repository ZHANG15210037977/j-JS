// leave.js
//四个时间存贮变量
var startDate = 0;
var startTimes = 0;
var endDate = 0;
var endTimes = 0;
//四个时间都已经存时运行的请假时长计算函数
function leaveDates_calculation(a, b, c, d) {
  //链接并处理开始时间和结束时间，创建时间对象
  var start = a + ' ' + b + ':00';
  var end = c + ' ' + d + ':00';
  start = start.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
  start = start.slice(0, end.indexOf("."));
  end = end.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
  end = end.slice(0, end.indexOf("."));
  start = new Date(start);
  end = new Date(end);
  var num = end - start;
  if (num > 0) {
    var day = Math.floor(num / (1000 * 3600 * 24));
    var hour = Math.floor((num - (day * 1000 * 3600 * 24)) / (1000 * 3600));
    var minute = Math.floor((num - (day * 1000 * 3600 * 24) - (hour * 1000 * 3600)) / (1000 * 60));
    if (day && hour && minute) {
      return day + '天' + hour + '小时' + minute + '分钟';
    }
    if (!day && hour && minute) {
      return hour + '小时' + minute + '分钟';
    }
    if (day && !hour && minute) {
      return day + '天' + minute + '分钟';
    }
    if (day && hour && !minute) {
      return day + '天' + hour + '小时';
    }
    if (!day && !hour && minute) {
      return minute + '分钟';
    }
    if (!day && hour && !minute) {
      return hour + '小时';
    }
    if (day && !hour && !minute) {
      return day + '天';
    }
    if (!day && !hour && !minute) {
      return 0;
    }
  } else {
    return 0;
  }
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading_key: false,
    teacherArray: [],
    teacher_id: null,
    leave_prove_key: false,
    leave_prove_img_key: false,
    leave_prove_imges_key: true,
    up_img_url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3277128572,4129418819&fm=27&gp=0.jpg',
    image_key: false,
    study_return_id: null,
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#ff0000",
      "backgroundColor": "#ffffff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/home_page/study/index/index",
          "text": "主页",
          "iconPath": "../../../../imges/tabBar_home.jpg",
          "selectedIconPath": "../../../../imges/tabBar_url.jpg",
          //"selectedColor": "#4EDF80",  
          active: false
        },
        {
          "pagePath": "/pages/wx_leave/message_submit/leave",
          "text": "请假",
          "iconPath": "../../../../imges/tabBar_leave.jpg",
          "selectedIconPath": "../../../../imges/tabBar_url.jpg",
          "selectedColor": "#4EDF80",
          active: true
        },
        {
          "pagePath": "/pages/lecture/study/index/index",
          "text": "讲座",
          "iconPath": "../../../../imges/tabBar_lecture.jpg",
          "selectedIconPath": "../../../../imges/tabBar_url.jpg",
          "selectedColor": "#4EDF80",
          active: false
        },
        {
          "pagePath": "/pages/curriculum/study/index/index",
          "text": "课程",
          "iconPath": "../../../../imges/tabBar_curriculum.jpg",
          "selectedIconPath": "../../../../imges/tabBar_url.jpg",
          "selectedColor": "#4EDF80",
          active: false
        }
      ],
      "position": "bottom"
    }
  },

  //上传凭证显隐切换函数
  leave_prove_switch: function (e) {
    var key = !this.data.leave_prove_key;
    this.setData({
      leave_prove_key: key
    })
  },
  //从手机获取请假凭证图片
  get_leave_prove_img: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.getImges('album');
        } else {
          that.getImges('camera');
        }
      }
    })
  },
  getImges: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: [type],
      success: function (res) {
        that.setData({
          up_img_url: res.tempFilePaths[0],
          leave_prove_img_key: true,
          leave_prove_imges_key: false,
          image_key: true
        })
      }
    })
  },

  //辅导员切换函数
  teacherNameChage: function (e) {
    var that = this;
    this.setData({
      index: e.detail.value,
      teacher_id: that.data.teacherArray[e.detail.value].teacher_id
    })
  },

  //请假开始日期切换函数
  leaveStartDateChange: function (e) {
    var that = this;
    this.setData({
      startDate: e.detail.value
    })
    startDate = e.detail.value;
    if (startDate && startTimes && endDate && endTimes) {
      var leavetime = leaveDates_calculation(startDate, startTimes, endDate, endTimes);
      if (leavetime) {
        that.setData({
          leaveDates: leavetime
        })
      } else {
        wx.showToast({
          title: '请假时间有误',
          image: "../../../imges/error.png",
          duration: 3000
        })
        that.setData({
          leaveDates: null
        })
      }
    }
  },

  //请假开始时间切换函数
  leaveStartTimeChange: function (e) {
    var that = this;
    this.setData({
      startTimes: e.detail.value
    })
    startTimes = e.detail.value;
    if (startDate && startTimes && endDate && endTimes) {
      var leavetime = leaveDates_calculation(startDate, startTimes, endDate, endTimes);
      if (leavetime) {
        that.setData({
          leaveDates: leavetime
        })
      } else {
        wx.showToast({
          title: '请假时间有误',
          image: "../../../imges/error.png",
          duration: 3000
        })
        that.setData({
          leaveDates: null
        })
      }
    }
  },

  //请假结束日期切换函数
  leaveEndDateChange: function (e) {
    var that = this;
    this.setData({
      endDate: e.detail.value,
    })
    endDate = e.detail.value;
    if (startDate && startTimes && endDate && endTimes) {
      var leavetime = leaveDates_calculation(startDate, startTimes, endDate, endTimes);
      if (leavetime) {
        that.setData({
          leaveDates: leavetime
        })
      } else {
        wx.showToast({
          title: '请假时间有误',
          image: "../../../imges/error.png",
          duration: 3000
        })
        that.setData({
          leaveDates: null
        })
      }
    }
  },

  //请假结束时间切换函数
  leaveEndTimeChange: function (e) {
    var that = this;
    this.setData({
      endTimes: e.detail.value
    })
    endTimes = e.detail.value;
    if (startDate && startTimes && endDate && endTimes) {
      var leavetime = leaveDates_calculation(startDate, startTimes, endDate, endTimes);
      if (leavetime) {
        that.setData({
          leaveDates: leavetime
        })
      } else {
        wx.showToast({
          title: '请假时间有误',
          image: "../../../imges/error.png",
          duration: 3000
        })
        that.setData({
          leaveDates: null
        })
      }
    }
  },

  //表单提交处理程序
  formSubmit: function (e) {
    var that = this;
    this.setData({
      loading_key: true
    })
    //判断是否需要上传请假凭证，如果为真，则需要上传
    if (!that.data.leave_prove_key) {
      //请假凭证上传
      if (that.data.image_key) {
        wx.uploadFile({
          url: 'https://www.mixvjiezi.xyz/wx/wx_leave/setLeaveProveImg.php',
          filePath: that.data.up_img_url,
          name: 'leave_img',
          success: function (res) {
            wx.request({
              url: 'https://www.mixvjiezi.xyz/wx/wx_leave/setMessage_up.php',
              data: {
                teacherName: e.detail.value.teacherName,
                studentName: that.data.studentName,
                studentNo: that.data.studentNo,
                startDate: e.detail.value.startDate,
                startTimes: e.detail.value.startTimes,
                endDate: e.detail.value.endDate,
                endTimes: e.detail.value.endTimes,
                leaveDates: e.detail.value.leaveDates,
                leaveReason: e.detail.value.leaveReason,
                form_id: e.detail.formId,
                teacher_id: that.data.teacher_id,
                leaveProveUrl: res.data,
                study_return_id: that.data.study_return_id
              },
              success: function (res) {
                if (res.data == 1) {
                  that.setData({
                    loading_key: false
                  })
                  wx.showToast({
                    title: "请假信息已提交",
                    icon: 'success',
                    duration: 3000,
                    mask: true,
                    success: function () {
                      setTimeout(function () {
                        wx.navigateBack({
                          delta:1
                        })
                      }, 1500)
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

          }
        })
      } else {
        that.setData({
          loading_key: false
        })
        wx.showToast({
          title: '请选择请假凭证',
          image: "../../../imges/error.png",
          duration: 3000
        })
      }
    } else {
      wx.request({
        url: 'https://www.mixvjiezi.xyz/wx/wx_leave/setMessage_up.php',
        data: {
          teacherName: e.detail.value.teacherName,
          studentName: that.data.studentName,
          studentNo: that.data.studentNo,
          startDate: e.detail.value.startDate,
          startTimes: e.detail.value.startTimes,
          endDate: e.detail.value.endDate,
          endTimes: e.detail.value.endTimes,
          leaveDates: e.detail.value.leaveDates,
          leaveReason: e.detail.value.leaveReason,
          form_id: e.detail.formId,
          teacher_id: that.data.teacher_id,
          leaveProveUrl: that.data.leave_prove_image_url,
          study_return_id: that.data.study_return_id
        },
        success: function (res) {
          if (res.data == 1) {
            that.setData({
              loading_key: false
            })
            wx.showToast({
              title: "请假信息已提交",
              icon: 'success',
              duration: 5000,
              mask: true,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500)
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cache = wx.getStorageSync('user');
    this.setData({
      studentName: cache.study_name,
      studentNo: cache.study_no
    })

    this.setData({
      loading_key: true
    })
    startDate = 0;
    startTimes = 0;
    endDate = 0;
    endTimes = 0
    var that = this;
    wx.request({
      url: "https://www.mixvjiezi.xyz/wx/wx_leave/setMessage_onLoad.php",
      success: function (res) {
        console.log(res.data);
        switch (res.data) {
          case 3:
            that.setData({
              loading_key: false
            })
            wx.showToast({
              title: "无可以请假老师",
              image: "../../../imges/error.png",
              duration: 3000,
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
            break;
          default:
            that.setData({
              teacherArray: res.data,
            })
            that.setData({
              loading_key: false
            })
            break;
        }
      }
    }),
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          that.setData({
            study_return_id: res.data
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