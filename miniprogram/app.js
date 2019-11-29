//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  onQuery: function (openid) {
    const db = wx.cloud.database()
    db.collection('userInfo').where({
      _openid: openid
    }).get({
      success: res => {
        this.globalData.userInfo = res.data[0]
        wx.setStorageSync('userInfo', res.data[0])
        console.log('[数据库] [查询记录] 成功: ', res.data)
        return res.data[0]
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
  onQueryTeamList: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('teamInfo').get({
      success: res => {
        this.globalData.teamList = res.data
        wx.setStorageSync('teamList', res.data)
        console.log('[数据库] [查询记录] 成功: ', res.data)
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
  onQueryUserList: function () {
    const db = wx.cloud.database()
    db.collection('userInfo').get({
      success: res => {
        this.globalData.userList = res.data
        wx.setStorageSync('userList', res.data)
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }
})
