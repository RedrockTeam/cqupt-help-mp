import { BaseRes } from "@/common/helpers/request";

// export interface MyActivity {
//   id: number;
//   name: string;
//   team_name: string;
//   time_done: number;
//   time: string;
//   introduction: string;
//   location: string;
//   rule: string;
//   registration: string;
//   myregistration: number;
//   type: 0 | 1; // 0 表示普通活动， 1 表示志愿活动
//   image: string;
// }
export interface MyActivity {
  id: number;
  type: 0 | 1; // 0 表示普通活动， 1 表示志愿活动
  name: string;
  team_name: string;
  description: string;
  sign_up_start: number;
  sign_up_last: number;
  last_date: number;
  start_date: number;
  myregistration: number;
  time_part: {
    begin_time: number;
    end_time: number;
  }
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
  is_received: 0 | 1; // 1 是已领取，0 是未领取
  index: number;
}

export type MyRewards = MyReward[];

export interface MyRewardsRes extends BaseRes {
  prizes: MyRewards;
}

export type MyRewardsApplyRes = BaseRes;

interface MyRead {
  number: number;
  unread: number;
}

export type MyReads = MyRead[];

export interface MyReadsRes extends BaseRes {
  data: MyRead
}
