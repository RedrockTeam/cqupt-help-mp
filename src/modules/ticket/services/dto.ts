/*
 * @Author: myjdml
 * @Date: 2021-03-10 21:11:01
 * @LastEditors: myjdml
 * @LastEditTime: 2021-04-18 14:35:30
 * @FilePath: \cqupt-help-mp\src\modules\ticket\services\dto.ts
 * @Description: nothing is everything
 */
import { BaseRes } from "@/common/helpers/request";

interface RobTicketInfo {
  id: number; // 影票的id
  name: string; // 影票名称
  type: number; // 影票类型 0表示讲座 1表示影票
  left: number; // 剩余影票的数量
  all: number; // 影票总数量
  re_send_num: number; // 已经抢到候补票的人数
  play_time: string; // 电影播放时间
  begin_time: string; // 抢票开始时间
  end_time: string; // 抢票结束时间
  location: string; // 电影播放地点
  image: string; // 影票图片
  is_received: boolean; // 是否抢到票
  introduction: string; // 影票介绍
  chief: string; // 主讲人
  start_take: string; // 取票开始时间 // 废弃参数，鑫宝没删
  end_take: string; // 取票结束时间 // 废弃参数，鑫宝没删
  place_take: string; //  取票地点 // 废弃参数，鑫宝没删
}

export interface RobTicketListInfoRes extends BaseRes {
  data: RobTicketInfo[];
}

export type RobTicketRes = BaseRes;

interface MyTicket {
  stu_num: string; // 表示学号
  id: number; // 影票的id
  name: string; // 影票名称
  type: number; // 影票类型 0表示讲座 1表示影票
  num_of_return: number; // 可以退票的次数
  sequence: number; // 该同学第几个抢到该票
  play_time: string; // 电影播放时间
  image: string; // 影票图片
  location: string; // 电影播放地点
  effective: boolean; // 影票是否有效
}
export interface MyTicketListRes extends BaseRes {
  data: MyTicket[];
}
