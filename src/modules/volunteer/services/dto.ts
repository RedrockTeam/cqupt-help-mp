import { BaseRes } from "@/common/helpers/request";

export interface CheckIsVolunteerRes extends BaseRes {
  exist: boolean;
}

export type LoginVolunteerRes = BaseRes;

export interface VolunteerInfo {
  phone: string;
  idCardNum: string;
  volunteerNum: string;
}

export interface VolunteerActivity {
  id: number;
  name: string;
  description: string;
  date: number; // 截止志愿活动时间戳
  last_date: number; // 截止报名的时间戳
  team_level: "校级" | "院级";
}

export interface VolunteerActivityListInfoRes extends BaseRes {
  data: VolunteerActivity[];
}

export interface TimeDetail {
  date: number;
  id: number;
  time_part_info: {
    begin_time: number;
    end_time: number;
    max: number;
    now: number;
  }[];
}

interface IVolunteerTimePartDetail {
  id: number; // 每天的志愿有不同的id
  date: number; //活动日期时间戳
  time_part_info: IVolunteerTimePartInfo[];
}

interface IVolunteerTimePartInfo {
  begin_time: number; // 时段开始时间戳
  end_time: number; // 时段结束时间戳
  now: number; //当前报名人数
  max: number; // 最大报名人数
}

export interface IVolunteerActivityDetail {
  rely_id: number;
  team_name: string;
  sign_up_start: number; // 报名开始时间戳
  sign_up_last: number; // 报名结束时间戳
  name: string;
  description: string;
  place: string;
  hour: string;
  start_date: number; // 活动开始时间戳
  last_date: number; // 活动截止时间戳
  num: string;
  imagines: string;
  need_additions: number[];
  detail: IVolunteerTimePartDetail[];
}

export interface VolunteerActivityDetailRes extends BaseRes {
  data: IVolunteerActivityDetail;
}

export interface VolunteerActivityApply {
  id: number;
  begin_time: number;
  end_time: number;
  addition: string;
}

export type VolunteerActivityApplyRes = BaseRes;

/**
 * 退出志愿活动相关
 */
export interface VolunteerActivityQuitReq {
  activity_id: number;
  begin_time: number;
  end_time: number;
}

export interface VolunteerActivityQuitRes {
  //  响应
  status: number;
  info: string;
}

/**
 * 志愿活动更改班次相关
 */
export interface VolunteerActivityChangeReq {
  old: {
    activity_id: number;
    begin_time: number;
    end_time: number;
  };
  new: {
    activity_id: number;
    begin_time: number;
    end_time: number;
  };
}

export interface VolunteerActivityChangeRes extends VolunteerActivityQuitRes {} // 跟退出活动的响应是一样的

/**
 * 扫码签到相关
 */
export interface VolunteerActivitySignInReq extends VolunteerActivityQuitReq {} // 跟退出活动的请求是一样的
export interface VolunteerActivitySignInRes extends VolunteerActivityQuitRes {} // 跟退出活动的响应是一样的
