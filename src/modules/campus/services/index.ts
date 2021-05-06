import request from "@/common/helpers/request";
import { GetStatusRes, HistoryListRes, ScanRes } from "./dto";

export const getStatus = (_key: string) =>
  request<GetStatusRes>("/cyb-guardian/guardian/getStatus", {
    method: "POST",
  });

export const getHistory = (_key: string, data) =>
  request<HistoryListRes>(`/cyb-guardian/guardian/getRecords`, {
    method: "POST",
    data,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

export const getScan = (plate: any) =>
  request<ScanRes>(`/cyb-guardian/guardian/getPlate${plate}`, {
    method: "POST",
  });

export const returnPlate = (plate: any) =>
  request<ScanRes>(`/cyb-guardian/guardian/returnPlate${plate}`, {
    method: "POST",
  });
