import request from "@/common/helpers/request";
import { GetIdCardRes } from "./dto";

export const getIdCardList = (_key: string) =>
  request<GetIdCardRes>("/cyb-idcard/getCards", {
    method: "GET",
  });
