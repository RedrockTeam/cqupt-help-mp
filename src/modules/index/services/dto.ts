/*
 * @Author: your name
 * @Date: 2021-04-14 14:45:51
 * @LastEditTime: 2021-04-18 17:20:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cqupt-help-mp/src/modules/index/services/dto.ts
 */
import { BaseRes } from "@/common/helpers/request";

interface Activity {
  activity_id: number, //志愿活动ID
  name: string, //活动名
  team_name: string, //组织名
  introduction: string, //活动介绍
  sign_up_start: number, //招募开始时间戳
  sign_up_last: number, //招募结束时间戳
  // 为什么小时会是字符串？？？
  hour: string, //志愿时长 (小时)
  team_level: string //志愿级别
}

export type ActivitiesHome = Activity[];

export interface ActivitiesHomeRes extends BaseRes {
  data: ActivitiesHome;
}

export interface ApplyActivityInfo {
  activity_id: number | string;
  begin_time: number | string;
  end_time: number | string;
}

export type ApplyActivityRes = BaseRes;
