import request from "@/common/helpers/request";
import { TicketAppealListInfoRes, MyBlackListRes, AppealInfo } from "./dto";

export const getTicketAppealList = (_key: string) => {
  return request<TicketAppealListInfoRes>("/cyb-secondkill/myexplain", {
    method: "POST",
  })
}

export const getMyBlackList = (_key: string) => {
  return request<MyBlackListRes>("/cyb-secondkill/ticket/myblacklist", {
    method: "GET",
  })
}

export const postAppeal = (data: AppealInfo) => {
  return request("/cyb-secondkill/explain", {
    method: "POST",
    data,
  })
}