import { BaseRes } from "@/common/helpers/request";

export interface IdCard {
  team_leave: "组织" | "社团";
  team_name: string;
  team_id: number;
  role: string;
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
