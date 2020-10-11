import { BaseRes } from "@/common/helpers/request";

export interface TimePart {
  begin_time: number;
  end_time: number;
}

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
}

export interface VolunteerActivityListInfoRes extends BaseRes {
  data: VolunteerActivity[];
}

export interface VolunteerActivityDetail {
  name: string;
  description: string;
  role: string; // 这是rule 后端命名的锅
  date: number; // 截止志愿活动时间戳
  hour: string;
  start_date: number;
  last_date: number; // 截止报名的时间戳
  num: string;
  time_part: TimePart[];
}

export interface VolunteerActivityDetailRes extends BaseRes {
  data: VolunteerActivityDetail;
}

export interface VolunteerActivityApply {
  id: string;
  begin_time: number;
  end_time: number;
}

export type VolunteerActivityApplyRes = BaseRes;
