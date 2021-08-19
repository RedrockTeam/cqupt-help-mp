import { BaseRes } from "@/common/helpers/request";

export interface IdCard {
  type: "组织" | "社团";
  team_name: string;
  team_id: number;
  title: string;
  certification: string;
  start_time: string;
  end_time: string;
}

export interface Association {
  team_name: string;
  team_id: number;
}

export interface GetIdCardRes extends BaseRes {
  data: IdCard[];
}
export interface GetAssociationsRes extends BaseRes {
  data: Association[];
}

export type IdCardApplyRes = BaseRes;
