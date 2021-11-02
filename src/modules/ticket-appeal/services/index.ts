import request from "@/common/helpers/request";
import { TicketAppealListInfoRes, MyBlackListRes, AppealInfo } from "./dto";

export const getTicketAppealList = (_key: string) => {
  return request<TicketAppealListInfoRes>("/christina-seckill/myexplain", {
    method: "POST",
  })
}

export const getMyBlackList = (_key: string) => {
  return request<MyBlackListRes>("/christina-seckill/ticket/myblacklist", {
    method: "GET",
  })
}

export const postAppeal = (data: AppealInfo) => {
  return request("/christina-seckill/explain", {
    method: "POST",
    data,
  })
}