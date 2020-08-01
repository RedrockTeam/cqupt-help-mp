import useSWR from "swr";
import { request } from "@tarojs/taro";
import { API } from "@/common/constants";

interface IRobTicketListInfo {
  id: number;
  name: string;
  left: number;
  play_time: string;
  begin_time: string;
  location: string;
  image: string;
  is_received: boolean;
}

interface IRobTicketListInfoRes {
  status: number;
  info: string;
  data: IRobTicketListInfo[];
}

export const useRobTicketListInfo = () =>
  useSWR<IRobTicketListInfoRes>(
    "ticketListInfo",
    () =>
      request({
        url: `${API}/cyb-secondKill/secKillInfo`,
        method: "POST",
      }).then((res) => res.data),
    {
      refreshInterval: 1000,
    }
  );

export const robTicket = (id: number) =>
  request({
    url: `${API}/cyb-secondKill/secKill`,
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: {
      id,
    },
  });
