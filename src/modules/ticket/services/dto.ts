/*
 * @Author: myjdml
 * @Date: 2021-03-10 21:11:01
 * @LastEditors: myjdml
 * @LastEditTime: 2021-04-17 14:49:56
 * @FilePath: \cqupt-help-mp\src\modules\ticket\services\dto.ts
 * @Description: nothing is everything
 */
import { BaseRes } from "@/common/helpers/request";

interface RobTicketInfo {
  id: number;
  name: string;
  left: number;
  play_time: string;
  begin_time: string;
  end_time: string;
  location: string;
  image: string;
  is_received: boolean;
  start_take: string;
  end_take: string;
  place_take: string;
}

export interface RobTicketListInfoRes extends BaseRes {
  data: RobTicketInfo[];
}

export type RobTicketRes = BaseRes;

interface MyTicket {
  stu_num: string; // 表示学号
  id: number; // 影票的id
  name: string; // 影票名称
  type: number; // 影票类型
  num_of_return: number; // 可以退票的次数
  sequence: number; // 该同学第几个抢到该票
  play_time: string; // 电影播放时间
  image: string; // 影票图片
  location: string; // 废弃参数，鑫宝没删
  effective: boolean; // 废弃参数，鑫宝没删
}
export interface MyTicketListRes extends BaseRes {
  data: MyTicket[];
}
