//util.js

//封装的函数

function findNameById(userList,id){
  for(var i = 0; i < userList.length; i++){
    if(userList[i]._id == id)
      return userList[i].name
  }
  return 
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
//转化成小程序模板语言 这一步非常重要 不然无法正确调用
module.exports = {
  link_teamList_userInfo: link_teamList_userInfo
}
