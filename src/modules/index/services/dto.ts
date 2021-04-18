/*
 * @Author: your name
 * @Date: 2021-04-14 14:45:51
 * @LastEditTime: 2021-04-17 21:21:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /cqupt-help-mp/src/modules/index/services/dto.ts
 */
import { BaseRes } from "@/common/helpers/request";

interface Activity {
  id: number;
  name: string;
  team_name: string;
  time_done: number;
  time: string;
  introduction: string;
  location: string;
  rule: string;
  registration: string;
  type: 1 | 2; // 1是线上 2是线下
  image: string;
  image_with: string;
}

export type ActivitiesHome = Activity[];

export interface ActivitiesHomeRes extends BaseRes {
  data: ActivitiesHome;
}

export interface ApplyActivityInfo {
  team: string;
  name: string;
  time: string;
}

export type ApplyActivityRes = BaseRes;
