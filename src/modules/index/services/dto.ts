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
