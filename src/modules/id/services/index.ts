import request from "@/common/helpers/request";
import { GetIdCardRes, IdCardApplyRes } from "./dto";

export const getIdCardList = (_key: string) =>
  request<GetIdCardRes>("/cyb-idcard/idCard/getCards", {
    method: "POST",
  });

export const applyIdCard = (associationName: string) =>
  request<IdCardApplyRes, string>("/cyb-idcard/idCard/register", {
    method: "POST",
    data: associationName,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
