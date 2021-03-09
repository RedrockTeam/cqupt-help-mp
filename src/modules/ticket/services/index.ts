import request from "@/common/helpers/request";
import { RobTicketListInfoRes, RobTicketRes, MyTicketListRes } from "./dto";

export const getRobTicketListInfo = (_key: string) =>
  request<RobTicketListInfoRes>("/cyb-secondkill/secKillInfo", {
    method: "POST",
  });

export const robTicket = (id: number) =>
  request<RobTicketRes>("/cyb-secondkill/secKill", {
    method: "POST",
    data: {
      product_id: id,
    },
  });

export const getMyTicketList = (_key: string) =>
  request<MyTicketListRes>("/cyb-secondkill/ticket/myTicket");

export const checkTicket = (id: number) =>
  request("/cyb-secondkill/ticket/updateEffective", {
    method: "POST",
    data: {
      product_id: id,
    },
  });
