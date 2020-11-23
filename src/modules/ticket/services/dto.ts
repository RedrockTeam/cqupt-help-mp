import { BaseRes } from "@/common/helpers/request";

interface RobTicketInfo {
  id: number;
  name: string;
  left: number;
  play_time: string;
  begin_time: string;
  location: string;
  image: string;
  is_received: boolean;
  start_take: string;
  end_take: string;
  place_take: string;
}

export interface RobTicketListInfoRes extends BaseRes {
  data: RobTicketInfo[];
}

export type RobTicketRes = BaseRes;

interface MyTicket {
  id: number;
  name: string;
  play_time: string;
  image: string;
  location: string;
  effective: boolean;
}
export interface MyTicketListRes extends BaseRes {
  data: MyTicket[];
}
