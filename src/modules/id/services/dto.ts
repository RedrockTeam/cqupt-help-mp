import { BaseRes } from "@/common/helpers/request";

export interface IdCard {
  name: string;
  college: string;
  team_name: string;
  create_time: string;
}

export interface GetIdCardRes extends BaseRes {
  data: IdCard[];
}

export type IdCardApplyRes = BaseRes;
