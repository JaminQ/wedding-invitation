const lunisolar = require('../../common/lunisolar')
const {
    addZero,
    getMonthDayCount
} = require('../../common/utils')

Component({
	properties: {
        date: {
            type: String,
            value: ''
        }
    },

    data: {
        list: [],
        year: '',
        month: '',
        day: '',
        dayNumber: ''
    },
    
    lifetimes: {
        created() {
            this.lunisolarDate = null
        },

        attached() {
            if (this.data.date !== '') {
                this.lunisolarDate = lunisolar(this.data.date)
                const {
                    year,
                    month,
                    day,
                    dayOfWeek
                } = this.lunisolarDate

                // 生成日历表
                // 先计算出当月1号是星期几
                let beginDayOfWeek = day === 1 ? dayOfWeek : ((dayOfWeek - day + 1) % 7)
                beginDayOfWeek < 0 && (beginDayOfWeek += 7)

                // 生成首周
                const list = []
                let curDay = 1
                const firstWeek = (new Array(beginDayOfWeek)).fill('')
                for (let i = beginDayOfWeek; i < 7; i++) firstWeek.push(curDay++)
                list.push(firstWeek)

                // 继续生成后面的日历数据
                let otherWeek = []
                for (let end = getMonthDayCount(year, month); curDay <= end; curDay++) {
                    if (otherWeek.length === 7) {
                        list.push(otherWeek)
                        otherWeek = []
                    }
                    otherWeek.push(curDay)
                }
                list.push(otherWeek)

                this.setData({
                    list,
                    year,
                    month: addZero(month),
                    day: addZero(day),
                    dayNumber: day
                })
            }
        }
    }
})