import { BaseRes } from "@/common/helpers/request";

export interface IdCard {
  type: "组织" | "社团";
  name: string;
  team_name: string;
  title: string;
  certification: string;
  start_time: string;
  end_time: string;
}

export interface GetIdCardRes extends BaseRes {
  data: IdCard[];
}

export type IdCardApplyRes = BaseRes;
