import { BaseRes } from "@/common/helpers/request";

export interface IdCard {
  team_level: "组织" | "社团";
  team_name: string;
  team_id: number; // team_id 为 10 的时候，team_level 为 社团，对的你没看错😊
  role: string; // team_level 为 社团的时候，role的格式为“team_name role”😊
  start_time: number | string;
  end_time: number | string;
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

export interface ApplyTeamInfo {
  team_id: number;
  remarks?: string;
}
