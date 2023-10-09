// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const surveys = db.collection('surveys')

// 云函数入口函数
exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()
    let { name, num, greeting } = event
    num *= 1

    const { data: res } = await surveys.where({
        _openid: OPENID
    }).get()
    let _id = ''

    if (res.length) { // 提交过，更新之
        await surveys.doc(res[0]._id).update({
            data: {
                name,
                num,
                greeting
            }
        })
        _id = res[0]._id
    } else { // 没有提交过，新增之
        const addRes = await surveys.add({
            data: {
                name,
                num,
                greeting,
                _openid: OPENID
            }
        })
        _id = addRes._id
    }

    return {
        name,
        num,
        greeting,
        _id
    }
}