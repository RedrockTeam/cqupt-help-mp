import { BaseRes } from "@/common/helpers/request";

export interface MyActivity {
  id: number;
  name: string;
  team_name: string;
  time_done: number;
  time: string;
  introduction: string;
  location: string;
  rule: string;
  registration: string;
  myregistration: number;
  type: 1 | 2;
  image: string;
}

export type MyActivities = MyActivity[];

export interface MyActivitiesRes extends BaseRes {
  data: MyActivities;
}

type Activity = Omit<MyActivity, "myregistration">;
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
