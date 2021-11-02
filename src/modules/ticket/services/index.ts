/*
 * @Author: myjdml
 * @Date: 2021-03-23 22:51:42
 * @LastEditTime: 2021-04-18 15:45:00
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: \cqupt-help-mp\src\modules\ticket\services\index.ts
 * 
 */
import request from "@/common/helpers/request";
import { RobTicketListInfoRes, RobTicketRes, MyTicketListRes } from "./dto";

export const getRobTicketListInfo = (_key: string) =>
  request<RobTicketListInfoRes>("/christina-seckill/secKillInfo", {
    method: "POST",
  });

export const robTicket = (id: number) =>
  request<RobTicketRes>("/christina-seckill/secKill", {
    method: "POST",
    data: {
      product_id: id,
    },
  });

export const robAlternateTicket = (id: number) =>
request<RobTicketRes>("/christina-seckill/resend", {
  method: "POST",
  data: {
    film_id: id,
  },
});

export const getMyTicketList = (_key: string) =>
  request<MyTicketListRes>("/christina-seckill/ticket/myTicket");

export const checkTicket = (id: number) =>
  request("/christina-seckill/ticket/updateEffective", {
    method: "POST",
    data: {
      product_id: id,
    },
  });

export const returnMyTicket = (id: number) => 
  request("/christina-seckill/ticket/refund", {
    method: "POST",
    data: {
      film_id: id,
    }
  });

