import request from "@/common/helpers/request";
import { RobTicketListInfoRes, RobTicketRes } from "./dto";

export const getRobTicketListInfo = (_key: string) =>
  request<RobTicketListInfoRes>("/cyb-secondKill/secKillInfo", {
    method: "POST",
  });

export const robTicket = (id: number) =>
  request<RobTicketRes>("/cyb-secondKill/secKill", {
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: {
      id,
    },
  });
