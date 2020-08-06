import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);

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

export const timestampToTimeCNString = (timestamp: number) =>
  timestampToDayjs(timestamp).format("MM 月 DD 日 HH:mm");

/**
 * 现在时间的十位 Unix 时间戳
 */
export const now = () => new Date().getTime() / 1000;

/**
 *  两个时间戳相差天数
 * @param 传入的时间戳
 * now()现在的时间戳
 */

export const gapDay = (param) => {
  const gap = param - now();
  return Math.floor(gap / 24 / 3600);
};
