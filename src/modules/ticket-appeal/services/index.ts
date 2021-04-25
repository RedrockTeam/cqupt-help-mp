import request from "@/common/helpers/request";
import { TicketAppealListInfoRes } from "./dto";

export const getTicketAppealList = (_key: string) => {
  return request<TicketAppealListInfoRes>("/cyb-secondkill/myexplain", {
    method: "POST",
  })
}

