// miniprogram/pages/teamGo/teamGoTeam/index.js

var util = require('../../../utils/util.js');      //引用外部的js文件
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      {
        message:"f1"
      },
      {
        message:"f2"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("app.globalData.openid:", app.globalData)
    app.onQuery(app.globalData.openid)
    app.onQueryTeamList()
    app.onQueryUserList()
    // console.log("app.globalData", app.globalData)
    // console.log("wx.getStorageSync('teamList')",wx.getStorageSync('teamList') || [])
    var teamList = wx.getStorageSync('teamList') || []
    var userList = wx.getStorageSync('userList') || []
    wx.setStorageSync("teamList", util.link_teamList_userInfo(teamList,userList))
    this.setData({
      teamList: wx.getStorageSync('teamList') || []
    })
    app.globalData.teamList = this.data.teamList
    console.log("this.data:",this.data)
    console.log("globalData:",app.globalData)
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

  onQuery: function (openid) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('userInfo').where({
      _openid: openid
    }).get({
      success: res => {
        return JSON.stringify(res.data, null, 2)
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
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