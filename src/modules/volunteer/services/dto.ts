import { BaseRes } from "@/common/helpers/request";

export interface CheckIsVolunteerRes extends BaseRes {
  data: boolean;
}

export type LoginVolunteerRes = BaseRes;

export interface VolunteerInfo {
  phone: string;
  idCardNum: string;
  volunteerNum: string;
}

export interface VolunteerActivity {
  activity_id: number;
  start_date: number;
  last_date: number;
  date: number;
  time_part: {
    time_id: number;
    begin_time: number;
    end_time: number;
  }
  result: {
    pass: number;
    qq: number;
  }
  status: {
    is_change: number;
    is_sign: number;
    is_read: number
  }
  name: string;
  team_name: string;
  introduction: string;
  sign_up_start: number;
  sign_up_last: number;
  hour: string;
  team_level: string;
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
  detail: any;
  detail_id: number; // 每天的志愿有不同的id
  date: number; //活动日期时间戳
  time_part_info: IVolunteerTimePartInfo[];
}

interface IVolunteerTimePartInfo {
  end_time: number;
  detail: unknown
  time_id: number;
  // begin_time: number; // 时段开始时间戳
  // end_time: number; // 时段结束时间戳
  now: number; //当前报名人数
}

export interface IVolunteerActivityDetail {
  detail: any;
  activity_id: number,
  name: string,
  team_name: string,
  introduction: string,
  sign_up_start: number,
  sign_up_last: number,
  hour: string,
  team_level: string,
  type: number,
  volunteer_list_id: number,
  last_date: number,
  start_date: number,
  date: number, //活动当天0时 时间戳
  time_part: {
    time_id: number,
    begin_time: number,
    end_time: number
  },
  result: {
    pass: number,  //0没审核，1通过，2没通过
    qq: number //活动QQ群
  },
  status: {
    is_change: number, //是否想要改变志愿，0未改变，1审核中，2已改变
    is_sign: number, //签到（志愿活动特供）0未签到，1签到
    is_read: number //1未读。2已读。3未审核
  }
}

export interface VolunteerActivityDetailRes extends BaseRes {
  data: IVolunteerActivityDetail;
}

export interface VolunteerActivityApply {
  time_id: number;
  addition: string;
}

export type VolunteerActivityApplyRes = BaseRes;

/**
 * 退出志愿活动相关
 */
export interface VolunteerActivityQuitReq {
  volunteer_list_id: string
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
  volunteer_list_id: string; // 志愿活动者ID
  new_time_id: string;
}

export interface VolunteerActivityChangeRes extends VolunteerActivityQuitRes { } // 跟退出活动的响应是一样的

/**
 * 扫码签到相关
 */
export interface VolunteerActivitySignInReq extends VolunteerActivityQuitReq { } // 跟退出活动的请求是一样的
export interface VolunteerActivitySignInRes extends VolunteerActivityQuitRes { } // 跟退出活动的响应是一样的
