/*
 * @Author: myjdml
 * @Date: 2021-03-23 22:51:42
 * @LastEditTime: 2021-04-17 14:30:26
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: \cqupt-help-mp\src\modules\ticket\services\index.ts
 * 
 */
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

export const returnMyTicket = (id: number) => {
  request("/cyb-secondkill/ticket/refund"), {
    method: "POST",
    data: {
      film_id: id,
    }
  }
}
