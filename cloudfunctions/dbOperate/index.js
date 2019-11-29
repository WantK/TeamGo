// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  var teamId = event.teamId
  var member_id_list = event.member_id_list
  var joined_number = event.joined_number

  const db = cloud.database()
  try{
    return await db.collection('teamInfo').doc(teamId).update({
      data: {
        member_id_list: member_id_list,
        joined_number: joined_number
      }
    })
  }catch(e){
    console.log(e)
  }
}