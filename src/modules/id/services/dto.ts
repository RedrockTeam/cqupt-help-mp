import { BaseRes } from "@/common/helpers/request";

export interface IdCard {
  type: "组织" | "社团";
  team_name: string;
  title: string;
  certification: string;
  start_time: string;
  end_time: string;
}

export interface GetIdCardRes extends BaseRes {
  data: IdCard[];
}
export interface GetAssociationsRes extends BaseRes {
  data: string[];
}

export type IdCardApplyRes = BaseRes;
