import dayjs from "dayjs";

/**
 * 转换 Unix 时间戳到 dayjs 对象
 * @param {number} timestamp 十位的 Unix 时间戳
 * @returns {Date}
 */
export const timestampToDayjs = (timestamp: number) => dayjs.unix(timestamp);

/**
 * 转换 Unix 时间戳到日期字符串：1587484800 => '2020.04.22'
 * @param {number} timestamp 十位的 Unix 时间戳
 * @returns {string}
 */
export const timestampToDateString = (timestamp: number) =>
  timestampToDayjs(timestamp).format("YYYY.MM.DD");

/**
 * 现在时间的十位 Unix 时间戳，复用这一个节省内存
 */
export const now = new Date().getTime() / 1000;
