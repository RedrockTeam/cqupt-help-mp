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

interface MyReward {
  activity_name: string;
  name: string;
  level: number;
  location: string;
  time_begin: number;
  time_end: number;
  organizers: string;
  activity_id: number;
  is_received: number;
  index: number;
}

export type MyRewards = MyReward[];

export interface MyRewardsRes extends BaseRes {
  prizes: MyRewards;
}

export type MyRewardsApplyRes = BaseRes;
