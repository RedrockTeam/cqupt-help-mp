import request from "@/common/helpers/request";
import { RobTicketListInfoRes, RobTicketRes, MyTicketListRes } from "./dto";

export const getRobTicketListInfo = (_key: string) =>
  request<RobTicketListInfoRes>("/cyb-secondKill/secKillInfo", {
    method: "POST",
  });

export const robTicket = (id: number) =>
  request<RobTicketRes>("/cyb-secondKill/secKill", {
    method: "POST",
    data: {
      product_id: id,
    },
  });

export const getMyTicketList = (_key: string) =>
  request<MyTicketListRes>("/cyb-secondKill/ticket/myTicket");
