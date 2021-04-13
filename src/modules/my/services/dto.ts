import {BaseRes} from "@/common/helpers/request";

// 我的活动
export interface MyActivity {
  rely_id: number;
  id: number;                                 //  活动id
  type: 0 | 1;                                // 0 表示普通活动， 1 表示志愿活动
  name: string;
  team_name: string;
  description?: string;
  sign_up_start?: number;                     // 报名时间段
  sign_up_last?: number;
  start_date: number;                         // 活动时间段
  last_date: number;
  registration_time: number;                  // 用户报名的当天时间
  result?: {
    pass: "0" | "1" | "2";                    // 0: 等待结果， 1: 录取通过， 2: 录取不通过
    qq?: string;
  };
  time_part: {
    // 用户选择参加活动的 时间段（秒）
    begin_time: number;
    end_time: number;
  };
  date?: number;                              // 用户选择的 参与活动的日期
  if_read: 1 | 2 | 3;                         // 1:未读，      2:已读，       3:无法读取
  is_change: 0 | 1 | 2;                       // 0:未改变,     1:审核中,      3:已改变     用户是否改变志愿班次
  is_sign: 0 | 1;                             // 0:未签到,     1:已签到
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

//  我的奖品
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

// 已读与未读
interface MyRead {
  number: number;
  unread: number;
}

export interface MyReadsRes extends BaseRes {
  data: MyRead;
}
