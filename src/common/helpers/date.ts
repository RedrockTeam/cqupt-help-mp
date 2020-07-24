import dayjs from 'dayjs'

/**
 * 转换 Unix 时间戳到 dayjs 对象
 * @param {number} timestamp 十位的 Unix 时间戳
 * @returns {Date} 
 */
export const timestampToDayjs = (timestamp: number) => dayjs.unix(timestamp)

/**
 * 转换 Unix 时间戳到日期字符串：1587484800 => '2020.04.22'
 * @param {number} timestamp 十位的 Unix 时间戳
 * @returns {string}
 */
export const timestampToDateString = (timestamp: number) => {
  return timestampToDayjs(timestamp).format('YYYY.MM.DD')
}
