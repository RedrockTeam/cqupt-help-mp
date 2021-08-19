import request from "@/common/helpers/request";
import { GetIdCardRes, IdCardApplyRes, GetAssociationsRes } from "./dto";

export const getIdCardList = (_key: string) =>
  request<GetIdCardRes>("/cyb-idcard/idCard/getCards", {
    method: "GET",
  });
export const getAssociations = (_key: string) =>
  request<GetAssociationsRes>("/cyb-idcard/idCard/getCards", {
    method: "GET",
  });

export const applyIdCard = (team_id: string) =>
  request<IdCardApplyRes, string>("/cyb-idcard/idCard/register", {
    method: "POST",
    data: team_id,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
