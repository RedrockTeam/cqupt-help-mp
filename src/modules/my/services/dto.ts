import { BaseRes } from "@/common/helpers/request";

export interface MyActivity {
  ID: number;
  StuNum: number;
  Name: string;
  team: string;
  time: string;
  Registiontime: string;
}

export type MyActivities = MyActivity[];

export interface MyActivitiesRes extends BaseRes {
  data: MyActivities;
}

export interface Activity {
  ID: number;
  StuNum: number;
  Name: string;
  team: string;
  time: string;
  Registiontime: string;
  // TODO 剩余时间以及线上线下
}

export type Activities = Activity[];

export interface ApplyActivities {
  team: string;
  name: string;
  time: string;
}

export interface ApplyActivitiesRes extends BaseRes {
  data: Activity;
}
