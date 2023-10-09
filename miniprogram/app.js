App({
    onLaunch() {
        wx.cloud.init({
            env: 'xxxxxxx' // 云开发环境ID，在云开发控制台里可以查看
        })
    }
})