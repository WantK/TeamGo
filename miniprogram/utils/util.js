//util.js

//封装的函数

function findNameById(userList,id){
  for(var i = 0; i < userList.length; i++){
    if(userList[i]._id == id)
      return userList[i].name
  }
}

function findTeamById(teamList,id){
  for (var i = 0; i < teamList.length; i++) {
    if (teamList[i]._id == id){
      return teamList[i]
    }
  }
}

function link_teamList_userInfo(teamList,userList) {
  // console.log("teamList:",teamList)
  // console.log("userList:", userList)
  // console.log(findNameById(userList,userList[0]._id))
  for(var i = 0; i < teamList.length; i++){
    teamList[i].headerName = findNameById(userList,teamList[i].header_id)
  }
  return teamList
}

function onGetOpenid() {
  console.log("onGetOpenId")
  // 调用云函数
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      getApp().globalData.openid = res.result.openid
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
      // wx.navigateTo({
      //   url: '../deployFunctions/deployFunctions',
      // })
    }
  })
}

//转化成小程序模板语言 这一步非常重要 不然无法正确调用
module.exports = {
  link_teamList_userInfo: link_teamList_userInfo,
  onGetOpenid: onGetOpenid,
  findTeamById: findTeamById
}
