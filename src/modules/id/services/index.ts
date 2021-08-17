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

export const applyIdCard = (associationName: string) =>
  request<IdCardApplyRes, string>("/cyb-idcard/idCard/register", {
    method: "POST",
    data: associationName,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
