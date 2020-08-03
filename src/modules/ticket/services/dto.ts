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
}

export interface RobTicketListInfoRes extends BaseRes {
  data: RobTicketInfo[];
}

export type RobTicketRes = BaseRes;
