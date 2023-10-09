// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const MAX_LIMIT = 100
const db = cloud.database()
const _ = db.command
const surveys = db.collection('surveys')

// 云函数入口函数
exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()
    const collection = await surveys.where({
        greeting: _.not(_.eq(''))
    })
    const { total } = await collection.count()
    const batchTimes = Math.ceil(total / MAX_LIMIT) // 计算要取几次
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
        tasks.push(collection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get())
    }

    return {
        greetings: (await Promise.all(tasks)).reduce((acc, cur) => {
            return acc.concat(cur.data.map(({ _id, name, greeting }) => ({ _id, name, greeting })))
        }, []),
        openid: OPENID
    }
}