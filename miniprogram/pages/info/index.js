import {
    genLocation
} from '../common'

Page({
    data: {
        // 公告栏描述
        desc: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

        // 新郎新娘联系方式
        couple: [{
            image: 'https://res.wx.qq.com/t/fed_upload/52557f40-32f9-4b37-9115-eed527e55683/husband.jpg',
            name: '新郎',
            number: 'XXXXXXXXXXX'
        }, {
            image: 'https://res.wx.qq.com/t/fed_upload/e4ddf6ce-990c-45b1-b4e9-bdf6a6b498ac/wife.jpg',
            name: '新娘',
            number: 'XXXXXXXXXXX'
        }],

        // 其余人员联系方式
        phone: [{
            name: '伴郎：XXX',
            number: 'XXXXXXXXXXX'
        }, {
            name: '伴娘：XXX',
            number: 'XXXXXXXXXXX'
        }],

        // 定位信息
        location: genLocation([{
            name: '婚宴酒店：XXXXXXXX',
            address: '详细地址XXXXXXXXXXXXXXX',
            latitude: 23.03387641906739,
            longitude: 113.7241439819336
        }]),

        // PDF资料
        files: [{
            name: '凌晨接亲时间表',
            fileID: 'cloud://online-xxxxxxxxx'
        }, {
            name: '婚礼时间表',
            fileID: 'cloud://online-xxxxxxxxx'
        }],

        // 其它事项
        info: [
            '各位需要过夜的兄弟姐妹酒店已安排好，入住时报新郎名字和手机号码即可（XXX，XXXXXXXXXXX），酒店有停车场，可免费停车，除了伴娘阿卡是单人间以外其他人都是双床房',
            '兄弟团先去洗头做发型再到我家集合，尽量8点半前到，实在有事的话最晚9点到，兄弟们把控好时间哈，辛苦大家',
            '最后的最后，文明接亲，欢乐接亲，希望大家多多配合，有什么需要，请联系帅气的新郎哥和美丽的新娘子，如有疏漏，请多多包涵'
        ]
    },

    // 呼叫
    call(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.dataset.phone
        })
    },

    // 打开定位
    openLocation(e) {
        const location = this.data.location[e.target.dataset.index]
        wx.openLocation({
            latitude: location.latitude,
            longitude: location.longitude,
            name: location.name,
            address: location.address
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

    // 下载并打开文件
    openFile(e) {
        wx.showLoading({
            title: '加载中'
        })
        const {
            fileID
        } = this.data.files[e.currentTarget.dataset.index]
        wx.cloud.downloadFile({
            fileID,
            success: res => {
                wx.openDocument({
                    filePath: res.tempFilePath,
                    showMenu: true,
                    fileType: 'pdf',
                    success: () => {
                        wx.hideLoading()
                    }
                })
            }
        })
    },

    // 分享到会话
    onShareAppMessage() {
        return {
            title: '婚礼公告栏',
            imageUrl: '../../images/infoPoster.jpg'
        }
    }
})