// miniprogram/pages/teamGo/teamGoAddTeam/index.js
var app = getApp()
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

  onActivityNameChange: function (e) {
    this.setData({
      activity_name: e.detail
    })
  },
  onTypeChange: function (e) {
    this.setData({
      type: e.detail
    })
  },
  onLocationChange: function (e) {
    this.setData({
      location: e.detail
    })
  },
  onDescriptionChange: function (e) {
    this.setData({
      description: e.detail
    })
  },
  onPeopleNumberChange: function (e) {
    this.setData({
      people_number: e.detail
    })
  },
  onEndTimeChange: function (e) {
    this.setData({
      end_time: e.detail
    })
  },
  onSubmit: function () {
    const db = wx.cloud.database()
    const create_time = new Date()
    db.collection('teamInfo').add({
      data: {
        header_id: app.globalData.userInfo._id,
        member_id_list:[],
        activity_name: this.data.activity_name,
        type: this.data.type,
        location: this.data.location,
        description: this.data.description,
        people_number: this.data.people_number,
        create_time: create_time.toLocaleDateString() + "-" + create_time.toLocaleTimeString(),
        end_time:this.data.end_time,
        is_delete:0,
        joined_number:1
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log(res)
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  handleChange(e) {
    switch (e.detail) {
      case 'group': wx.navigateTo({
        url: '../teamGoTeamList/index'
      })
      case 'add': wx.navigateTo({
        url: '../teamGoAddTeam/index'
      })
      case 'mine': wx.navigateTo({
        url: '../teamGoIndex/index'
      })
      default:
    }
  }
})