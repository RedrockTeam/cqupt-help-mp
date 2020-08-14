import { BaseRes } from "../../../common/helpers/request";

export interface GetStatusRes extends BaseRes {
  number: number; // 0 表示没有存包
  plate: string;
  save_time: string;
}

export interface HistoryItem {
  id: number;
  save_time: string;
  take_time: string;
  location: string;
  plate_num: number;
  stu_name: string;
  sport_time: number;
}

export type HistoryList = HistoryItem[];

export interface HistoryListRes extends BaseRes {
  records: HistoryList;
}

export interface ScanRes extends BaseRes {
  plate_num: string;
  available: number;
}
