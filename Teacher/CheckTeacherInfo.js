// pages/BindingAndIndex/CheckTeacherInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   info:{
    "id": 3486,
    "type": "student",
    "name": "张s",
    "number": "23320152202333",
    "phone": "18911114514",
    "email": "23320152202333@stu.xmu.edu.cn",
    "gender": "male",
    "school": {
      "id": 32,
      "name": "厦门大学"
    },
    "title": "",
    "avatar": "/avatar/3486.png"
  }
  },
  /*模态弹窗（解绑） */
  modalcnt: function () {
    wx.showModal({
      title: '注意',
      content: '确定要解绑吗？',
      success: function (res) {
        if (res.confirm) {
          var IPPort = getApp().globalData.IPPort;
          var message = "";
          var that = this;
          var k = { "unionID": "" };
          wx.request({
            url: IPPort + '/me',
            method: 'PUT',
            data:k,
            success: function (data) {
              console.log(data);
            }
          });


          wx.reLaunch({
            
            url: '../common/ChooseCharacter',
          })
          console.log('用户点击确定解绑')
        } else if (res.cancel) {
          console.log('用户点击取消解绑')
        }
      }
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var IPPort = getApp().globalData.IPPort;
    var message = "";
    var that = this;
    wx.request({
      url: IPPort + '/me',
      method: 'GET',
      //data:this.data.info,
      success: function (data) {
        console.log(data);
        that.setData({
          info: data.data,
        })
      }
    });
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
  changeAvatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var a = 'info.avatar'
        var tempFilePaths = res.tempFiles[0].path;
        console.log(that.data.info.avatar);
        that.setData({
          [a]: tempFilePaths,
        });
        var k = { "url": that.data.info.avatar};
        console.log(k);
        

        var IPPort = getApp().globalData.IPPort;
        var message = "";
        wx.request({
          url: IPPort + '/upload/avatar',
          method: 'POST',
          data:k,
          success: function (data) {
            wx.request({
              url: IPPort + '/me',
              method: 'PUT',
              success: function (data) {
                console.log(data);
                that.setData({
                  info: data.data,
                })
              }
            });
          }
        });


      },
    })
  },

})