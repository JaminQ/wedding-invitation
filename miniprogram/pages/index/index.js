const {
    genLocation
} = require('../../common/utils')

// 管理员openid列表，可以在云开发管理页找到，是管理员的话可以看到公告栏页面入口，也可以通过云函数greetings的返回值openid来查看，还可以在本文件getGreetings方法里通过打印openid变量来查看
const MANAGER = ['']

const APP = getApp()
const isRemoved = APP.globalData.isRemoved

Page({
    data: {
        ...APP.globalData,
        isManager: false, // 当前用户是否为管理员
        musicIsPaused: false, // 是否暂停背景音乐
        activeIdx: isRemoved ? 0 : -1, // 祝福语轮播用，当前显示的祝福语索引值
        form: { // 表单信息
            name: '',
            num: '',
            greeting: ''
        },
        weddingTimeStr: [], // 格式化的婚礼日期列表

        // 以上变量都不用动，以下变量是需要手动修改的

        // 是否显示彩蛋（由于彩蛋我没有改动，显示的还是我本人的内容，所以我把它默认隐藏起来，方便别人抄作业）
        showEggs: false,

        // 祝福语列表
        greetings: isRemoved ? [
            // 云开发下架后显示的祝福语数据，可以在云开发环境销毁前把数据库的数据导出来并贴到这里
            {
                name: '新郎 & 新娘',
                num: 2,
                greeting: '欢迎大家来见证我们的幸福时刻，我们婚礼上见哦~'
            }, {
                name: '伴郎 & 伴娘',
                num: 2,
                greeting: '祝帅气的新郎和美丽的新娘新婚快乐~白头偕老💐'
            }
        ] : [],

        // 背景音乐（默认用陈奕迅的《I DO》，想换的话自己去找音频资源，我是在「婚贝」上找的）
        music: {
            src: 'https://amp3.hunbei.com/mp3/IDo_ChenYiXun.mp3', // 音频资源链接
            name: 'I DO', // 歌名
            singer: '陈奕迅' // 歌手名
        },

        // 酒店信息（通过页面上的「选择位置并获取定位信息」按钮可以获取定位信息，发布前记得把按钮注释起来）
        location: genLocation([{
            name: '婚宴酒店名XXXXXXXX',
            address: '详细地址XXXXXXXXXXXXXXX',
            latitude: 23.03387641906739,
            longitude: 113.7241439819336
        }])[0],

        // 图片信息（其实就是婚纱照了）
        imgs: {
            // 封面图
            cover: 'https://res.wx.qq.com/t/fed_upload/459fb8da-b31a-420f-b8cc-f51126952685/cover.jpg',

            // 音乐封面
            poster: 'https://res.wx.qq.com/t/fed_upload/d811d254-e5d6-4c19-9ff8-77c4b6128137/poster.jpg',

            // 新郎独照
            husband: 'https://res.wx.qq.com/t/fed_upload/d811d254-e5d6-4c19-9ff8-77c4b6128137/husband.jpg',

            // 新娘独照
            wife: 'https://res.wx.qq.com/t/fed_upload/d811d254-e5d6-4c19-9ff8-77c4b6128137/wife.jpg',

            // 轮播图1
            swiper1: [
                'https://res.wx.qq.com/t/fed_upload/849dfcf2-049a-42ba-9f6c-ddd6f30b8487/swiper1-1.jpg',
                'https://res.wx.qq.com/t/fed_upload/849dfcf2-049a-42ba-9f6c-ddd6f30b8487/swiper1-2.jpg',
                'https://res.wx.qq.com/t/fed_upload/849dfcf2-049a-42ba-9f6c-ddd6f30b8487/swiper1-3.jpg'
            ],

            // 连续图
            series: [
                'https://res.wx.qq.com/t/fed_upload/c707cb28-126b-4a5d-89f6-688551456d15/series1.jpg',
                'https://res.wx.qq.com/t/fed_upload/c707cb28-126b-4a5d-89f6-688551456d15/series2.jpg',
                'https://res.wx.qq.com/t/fed_upload/c707cb28-126b-4a5d-89f6-688551456d15/series3.jpg'
            ],

            // 左上图
            leftUp: 'https://res.wx.qq.com/t/fed_upload/50898c02-4dd4-480a-ba6c-b175461b7b31/left-up.jpg',

            // 左下图
            leftDown: 'https://res.wx.qq.com/t/fed_upload/50898c02-4dd4-480a-ba6c-b175461b7b31/left-down.jpg',

            // 四宫图
            map: [
                'https://res.wx.qq.com/t/fed_upload/b959a506-ca42-47e1-9fbd-732a6151e3d9/map1.jpg',
                'https://res.wx.qq.com/t/fed_upload/b959a506-ca42-47e1-9fbd-732a6151e3d9/map2.jpg',
                'https://res.wx.qq.com/t/fed_upload/b959a506-ca42-47e1-9fbd-732a6151e3d9/map3.jpg',
                'https://res.wx.qq.com/t/fed_upload/b959a506-ca42-47e1-9fbd-732a6151e3d9/map4.jpg'
            ],

            // 轮播图2
            swiper2: [
                'https://res.wx.qq.com/t/fed_upload/65134c0f-c513-410e-b4ff-ab738801540f/swiper2-1.jpg',
                'https://res.wx.qq.com/t/fed_upload/65134c0f-c513-410e-b4ff-ab738801540f/swiper2-2.jpg',
                'https://res.wx.qq.com/t/fed_upload/65134c0f-c513-410e-b4ff-ab738801540f/swiper2-3.jpg'
            ],

            // 轮播图2下方常驻图
            swiper2Static: 'https://res.wx.qq.com/t/fed_upload/30d86ea7-84b8-46ce-ae60-e31b83a04fcc/swiper2-static.jpg',

            // 轮播图3
            swiper3: [
                'https://res.wx.qq.com/t/fed_upload/77b990f0-6f16-4fa2-8163-ad0eac3e40da/swiper3-1.jpg',
                'https://res.wx.qq.com/t/fed_upload/77b990f0-6f16-4fa2-8163-ad0eac3e40da/swiper3-2.jpg',
                'https://res.wx.qq.com/t/fed_upload/77b990f0-6f16-4fa2-8163-ad0eac3e40da/swiper3-3.jpg'
            ],

            // 结尾图1
            end1: 'https://res.wx.qq.com/t/fed_upload/9b5bad9c-216b-4fd5-a3da-01bdb3a5e832/end1.jpg',

            // 结尾图2
            end2: 'https://res.wx.qq.com/t/fed_upload/9b5bad9c-216b-4fd5-a3da-01bdb3a5e832/end2.jpg'
        }
    },

    // 小程序加载时，拉取表单信息并填充，以及格式化各种婚礼时间
    onLoad() {
        this.timer = null
        this.music = null
        this.isSubmit = false

        if (!isRemoved) {
            const db = wx.cloud.database()
            db.collection('surveys').get({
                success: res => {
                    if (res.data.length) {
                        const {
                            name,
                            num,
                            greeting
                        } = res.data[0]
                        this.setData({
                            form: {
                                name,
                                num,
                                greeting
                            }
                        })
                    }
                }
            })
        }

        this.lunisolarDate = this.selectComponent('#calendar').lunisolarDate
        this.setData({
            weddingTimeStr: [
                this.lunisolarDate.format('YYYY-MM-DD HH:mm'),
                this.lunisolarDate.getSeason(),
                this.lunisolarDate.format('YYYY年MM月DD号  HH:mm'),
                this.lunisolarDate.format('农历lMlD  dddd'),
                this.lunisolarDate.format('YYYY年MM月DD号')
            ]
        })
    },

    // 小程序卸载时，取消自动拉取祝福语定时器，销毁背景音乐
    onUnload() {
        if (this.timer !== null) {
            clearInterval(this.timer)
            this.timer = null
        }

        if (this.music !== null) {
            this.music.destroy()
            this.music = null
        }
    },

    // 小程序可见时，拉取祝福语，并设置定时器每20s重新拉取一次祝福语
    onShow() {
        if (!isRemoved) {
            this.getGreetings()

            this.timer === null && (this.timer = setInterval(() => this.getGreetings(), 20000));
        }
    },

    // 小程序不可见时，取消自动拉取祝福语定时器
    onHide() {
        if (this.timer !== null) {
            clearInterval(this.timer)
            this.timer = null
        }
    },

    // 小程序可用时，初始化背景音乐并自动播放
    onReady() {
        if (this.music === null) {
            this.music = wx.createInnerAudioContext({
                useWebAudioImplement: false
            })
            this.music.src = this.data.music.src
            this.music.loop = true
            this.music.autoplay = true
        }
    },

    // 分享到会话
    onShareAppMessage() {
        return {
            title: '好久不见，婚礼见٩(๑^o^๑)۶',
            imageUrl: '../../images/shareAppMsg.jpg'
        }
    },

    // 分享到朋友圈
    onShareTimeline() {
        return {
            title: '好久不见，婚礼见٩(๑^o^๑)۶',
            imageUrl: '../../images/shareTimeline.jpg'
        }
    },

    // 点击右上角音乐按钮控制音频播放和暂停
    toggleMusic() {
        if (this.music.paused) {
            this.music.play()
            this.setData({
                musicIsPaused: false
            })
        } else {
            this.music.pause()
            this.setData({
                musicIsPaused: true
            })
        }
    },

    // 打开酒店定位
    openLocation() {
        const {
            latitude,
            longitude,
            name,
            address
        } = this.data.location
        wx.openLocation({
            latitude,
            longitude,
            name,
            address
        })
    },

    // 仅用于获取定位信息，获取后会打印到控制台并写入到粘贴板，正式发布时记得注释起来
    chooseLocation() {
        wx.chooseLocation({
            success(res) {
                wx.setClipboardData({
                    data: JSON.stringify(res),
                    success() {
                        wx.showToast({
                            title: '已写入剪贴板'
                        })
                        console.log(res)
                    }
                })
            }
        })
    },

    // 呼叫
    call(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.dataset.phone
        })
    },

    // 提交表单
    submit(e) {
        if (!this.isSubmit) {
            const {
                name,
                num
            } = e.detail.value
            if (name === '') {
                wx.showToast({
                    title: '要写上名字哦~',
                    icon: 'error'
                })
            } else if (num === '') {
                wx.showToast({
                    title: '要写上人数哦~',
                    icon: 'error'
                })
            } else if (!/^[1-9]\d*$/.test(num)) {
                wx.showToast({
                    title: '人数不对哦~',
                    icon: 'error'
                })
            } else {
                if (isRemoved) {
                    wx.showToast({
                        title: '婚礼结束了哦~'
                    })
                } else {
                    this.isSubmit = true
                    const wording = this.data.form.name ? '更新' : '提交';
                    wx.showLoading({
                        title: `${wording}中`
                    })
                    wx.cloud.callFunction({
                        name: 'surveys',
                        data: e.detail.value
                    }).then(({
                        result: {
                            name,
                            num,
                            greeting,
                            _id
                        }
                    }) => {
                        const greetings = this.data.greetings
                        !greetings.some(item => {
                            if (item._id === _id) { // 如果找到了该祝福语，更新之
                                item.greeting = greeting
                                return true
                            }
                            return false
                        }) && greetings.push({ // 如果没有找到，追加之
                            name,
                            greeting,
                            _id
                        })
                        this.setData({
                            form: {
                                name,
                                num,
                                greeting
                            },
                            greetings
                        })
                        this.isSubmit = false
                        wx.showToast({
                            title: `${wording}成功`,
                            icon: 'success'
                        })
                    })
                }
            }
        }
    },

    // 获取祝福语
    getGreetings() {
        wx.cloud.callFunction({
            name: 'greetings'
        }).then(({
            result: {
                greetings,
                openid
            }
        }) => {
            const isManager = MANAGER.indexOf(openid) > -1
            greetings.length && this.setData(this.data.activeIdx === -1 ? {
                isManager,
                greetings,
                activeIdx: 0
            } : {
                isManager,
                greetings
            })
        })
    },

    // 轮播动画结束时切换到下一个
    onAnimationend() {
        this.setData({
            activeIdx: (this.data.activeIdx === this.data.greetings.length - 1) ? 0 : (this.data.activeIdx + 1)
        })
    },

    // 跳转到联系新郎新娘板块
    goPhone() {
        wx.pageScrollTo({
            selector: '.phone',
            offsetTop: -200
        })
    },

    // 跳转到写表单板块
    goWrite() {
        wx.pageScrollTo({
            selector: '.form',
            offsetTop: -200
        })
    },

    // 跳转到公告栏页面
    goInfo() {
        wx.navigateTo({
            url: '../info/index'
        })
    }
})