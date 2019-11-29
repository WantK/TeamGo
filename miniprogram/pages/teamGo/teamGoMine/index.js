// miniprogram/pages/teamGo/teamGoIndex/index.js
import Toast from '../dist-vant/toast/toast';

var app = getApp()
const db = wx.cloud.database()
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
    wx.cloud.callFunction({
      name: 'dbOperate',
      data: {
        "data": "hello cloud"
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
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

  onNameChange: function(e) {
    // console.log("onNameChange e.detail.value:",e.detail)
    this.setData({
      name: e.detail
    })
    // console.log("onNameChange this.data.name:",this.data.name)
  },
  onMajorChange: function (e) {
    this.setData({
      major: e.detail
    })
  },
  onHobbyChange: function (e) {
    this.setData({
      hobby: e.detail
    })
  },
  onPhoneChange: function (e) {
    this.setData({
      phone: e.detail
    })
  },
  onUniversityChange: function (e) {
    this.setData({
      university: e.detail
    })
  },
  onGenderChange(e) {
    this.setData({
      gender: e.detail
    })
  },

  onSubmit: function () {
    // if(name == ''){
    //   wx.showToast({
    //     icon: 'none',
    //     title: '删除失败',
    //   })
    // }
    const db = wx.cloud.database()
    const create_time = new Date()
    console.log("onSubmit this.data.name:", this.data.name)
    db.collection('userInfo').add({
      data: {
        name: this.data.name,
        major:this.data.major,
        hobby:this.data.hobby,
        phone:this.data.phone,
        university:this.data.university,
        gender:this.data.gender,
        create_time: create_time.toLocaleDateString() + "-" + create_time.toLocaleTimeString()
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          name: res._id,
        })
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

  onQuery: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('userInfo').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
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
    this.setData({
      updateInput: ''
    })
  },
  onUpdate: function () {
    const db = wx.cloud.database()
    const updateId = this.data.updateId
    console.log(updateId)
    db.collection('userInfo').doc(updateId).update({
      data:{
        name: updateId
      },
      success: res => {
        // this.setData({
        //   count: newCount
        // })
        console.log(res)
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  onIdUpdate: function (e) {
    // console.log("onNameChange e.detail.value:",e.detail.value)
    this.setData({
      updateId: e.detail.value
    })
    // console.log("onNameChange this.data.updateId:",this.data.updateId)
  },

  onRemove: function () {
    const db = wx.cloud.database()
    db.collection('userInfo').doc(this.data.removeInput).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.setData({
          removeInput: '',
          // count: null,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  },
  onIdRemove: function (e) {
    // console.log("onNameChange e.detail.value:",e.detail.value)
    this.setData({
      removeInput: e.detail.value
    })
    // console.log("onNameChange this.data.changeId:",this.data.changeId)
  },
  // 导航栏响应事件
  handleChange(e) {
    switch(e.detail){
      case 'group': wx.navigateTo({
        url: '../teamGoTeamList/index'
      }); break;
      case 'add': wx.navigateTo({
        url: '../teamGoAddTeam/index'
      }); break;
      case 'mine': this.onLoad(); break ;
      default:
    }
  }
})