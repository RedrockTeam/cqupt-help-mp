import request from "@/common/helpers/request";
import {
  GetIdCardRes,
  IdCardApplyRes,
  GetAssociationsRes,
  ApplyTeamInfo,
} from "./dto";

const BASE_URL = "https://be-dev.redrock.cqupt.edu.cn/christina-identity/front";

export const getIdCardList = (_key: string) =>
  request<GetIdCardRes>(`${BASE_URL}/myTeam`, {
    method: "GET",
  });
export const getAssociations = (_key: string) =>
  request<GetAssociationsRes>(`${BASE_URL}/allTeam`, {
    method: "GET",
  });

export const applyIdCard = (data: ApplyTeamInfo) =>
  request<IdCardApplyRes, ApplyTeamInfo>(`${BASE_URL}/apply`, {
    method: "POST",
    data,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
