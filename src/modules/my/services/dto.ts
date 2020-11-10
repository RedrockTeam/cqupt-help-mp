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
  description?: string;
  sign_up_start?: number; // 报名时间段
  sign_up_last?: number;
  last_date: number; // 活动时间段
  start_date: number;
  registration_time: number; // 用户报名的当天时间
  result?: {
    pass: 0 | 1 | 2; // 0: 等待结果， 1: 录取通过， 2: 录取不通过
    qq?: number;
  };
  time_part: { // 用户选择参加活动的 时间段（秒）
    begin_time: number;
    end_time: number;
  };
  date?: number; // 用户选择的 参与活动的日期
  if_read: 1 | 2 | 3; // 1:未读，2:已读，3:无法读取
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
