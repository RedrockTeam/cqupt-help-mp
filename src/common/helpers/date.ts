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

/**
 * 名字乱取的
 * 十位时间戳 转化
 * @param timestamp
 */
export const timestampToFormString = (timestamp: number) =>
  timestampToDayjs(timestamp).format("YYYY.MM.DD HH:mm");

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

/**
 * 天天护跑开放时间判断
 * 19:50-22:10
 */

export const isOpen = () => {
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  if (
    (hour === 19 && minutes > 50) ||
    (hour > 19 && hour < 22) ||
    (hour === 22 && minutes < 10)
  ) {
    return true;
  }
  return false;
};

/**
 * 时区时间转化
 * "2020-08-06T05:55:11Z" => "2020.08.06 13:55"
 */

export const timestampToTimeString = (param: number) => {
  return dayjs.unix(param).format("YYYY.MM.DD HH:mm");
};

/**
 * 计算现在到目标时间的剩余时间
 */

export const leftTime = (timestamp: number) => {
  const now = +new Date() / 1000;
  const interval = timestamp - now;
  const h = Math.floor(interval / 60 / 60);
  const m = Math.ceil((interval / 60) % 60);
  if (h > 0) {
    return `${h}小时${m}分钟`;
  } else {
    return `${m}分钟`;
  }
};
