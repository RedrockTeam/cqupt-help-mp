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
 * 转换 Unix 时间戳到 月.日 时间 字符串：1587484800 => '4月22日'
 * @param timestamp
 */
export const timestampToMDString = (timestamp: number) => {
  let date: any = timestampToDateString(timestamp).split('.');
  if (date) date = date[1].replace(/\b(0+)/gi, "") + '月' + date[2].replace(/\b(0+)/gi, "") + '日';
  return date
}


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

export const timestampToTimeStreamString = (timestampEarly: number, timestampLater: number) => {
  return `${timestampToDayjs(timestampEarly).format("MM 月 DD 日 HH:mm")}-${timestampToDayjs(timestampLater).format("HH:mm")}`;
}

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

/**
 *  将时间戳转换为 HH:MM的字符串
 */
export const timestampToHMString = (timestamp: number) =>
  timestampToDayjs(timestamp - 8 * 60 * 60).format("HH:mm");


/**
 * 将 字符串 'MM月DD日 hh:mm-hh:mm' 转换为已秒计数的起始与终止时间段
 */
export const genSeconds = (date: string): { date: number, begin_time: number, end_time: number } => {

  let seqIndex = date.indexOf('日');
  let _date = date.slice(0, seqIndex + 1);
  // @ts-ignore
  _date = _date.split('月');
  _date = `${new Date().getFullYear()}/${_date[0]}/${_date[1].split('日')[0]}`
  // @ts-ignore
  _date = new Date(_date).getTime() / 1000;

  // 计算生成 begin_time end_time   两者均为hh:mm 的秒计数
  let tmp_date = date.slice(seqIndex + 1).replace(' ', '');
  // @ts-ignore
  tmp_date = tmp_date.split('-')
  // console.log('date:', tmp_date)

  const _begin_time = tmp_date[0].split(':')
  const begin_time = parseInt(_begin_time[0]) * 3600 + parseInt(_begin_time[1]) * 60;
  // console.log('b:', begin_time)
  const _end_time = tmp_date[1].split(':')
  const end_time = parseInt(_end_time[0]) * 3600 + parseInt(_end_time[1]) * 60;
  return {
    date: Number(_date),
    begin_time,
    end_time
  }
}

/*
*    传入 xx-xx-xx 返回 时间戳(s)
*/
export const ConvertingDatesToTimestamps = (data: string) => {
  return dayjs(data).unix()
}
