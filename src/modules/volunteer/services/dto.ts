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
  left: number;
}

export interface VolunteerActivityListInfoRes extends BaseRes {
  data: VolunteerActivity[];
}

export interface VolunteerActivityDetail {
  name: string;
  description: string;
  role: string;
  date: number;
  hour: string;
}

export interface VolunteerActivityDetailRes extends BaseRes {
  data: VolunteerActivityDetail;
}

export interface VolunteerActivityApply {
  id: number;
  timePart: number;
}

export type VolunteerActivityApplyRes = BaseRes;
