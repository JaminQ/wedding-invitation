const APP = getApp()

Component({
	properties: {
        useChannelVideo: { // 是否使用官方的channel-video组件（小程序个人号无法使用feed-token）
            type: Boolean,
            value: false
        },
        finderUserName: { // useChannelVideo为false时必填
            type: String,
            value: ''
        },
        feedId: { // useChannelVideo为false时必填
            type: String,
            value: ''
        },
        poster: { // 封面图，封面比例建议使用4:3，useChannelVideo为false时生效
            type: String,
            value: ''
        },
        nickname: { // 视频号昵称，useChannelVideo为false时生效
            type: String,
            value: '视频号'
        },
        feedToken: { // useChannelVideo为false时忽略该字段
            type: String,
            value: ''
        }
	},

	data: {
        isSinglePage: APP.globalData.isSinglePage, // 是否单页模式
        magic: APP.globalData.magic // 魔法开关
    },
    
    pageLifetimes: {
        // 页面展示时，更新是否单页模式
        show() {
            const isSinglePage = APP.globalData.isSinglePage
            if (this.data.isSinglePage !== isSinglePage) {
                this.setData({
                    isSinglePage
                })
            }
        }
    },

	methods: {
        // 打开视频号视频
        openChannel() {
            wx.openChannelsActivity({
                finderUserName: this.properties.finderUserName,
                feedId: this.properties.feedId
            })
        }
	}
})
