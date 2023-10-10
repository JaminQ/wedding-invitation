App({
    globalData: {
        // 婚礼日期时间
        weddingTime: '2023-09-20 17:00:00',

        // 新郎新娘信息
        couple: [{
            image: 'https://res.wx.qq.com/t/fed_upload/52557f40-32f9-4b37-9115-eed527e55683/husband.jpg',
            name: '周杰伦',
            alias: '新郎',
            number: 'XXXXXXXXXXX',
            birthday: '1979.01.18'
        }, {
            image: 'https://res.wx.qq.com/t/fed_upload/e4ddf6ce-990c-45b1-b4e9-bdf6a6b498ac/wife.jpg',
            name: '昆凌',
            alias: '新娘',
            number: 'XXXXXXXXXXX',
            birthday: '1993.08.12'
        }],

        // 发布者
        publisher: '杰伦昆凌',

        // 纪念日
        anniversary: '2021.12.11',
    },

    onLaunch() {
        wx.cloud.init({
            env: 'xxxxxxx' // 云开发环境ID，在云开发控制台里可以查看
        })
    }
})