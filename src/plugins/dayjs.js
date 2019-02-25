import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import relativeTime from 'dayjs/plugin/relativeTime'
import isLeapYear from 'dayjs/plugin/isLeapYear.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import 'dayjs/locale/zh-cn.js'
dayjs
  .extend(advancedFormat)
  .extend(relativeTime)
  .extend(isLeapYear)
  .extend(weekOfYear)
  .extend(isSameOrAfter)
  .locale('zh-cn')

export default dayjs
