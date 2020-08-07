import { BaseRes } from "../../../common/helpers/request";

export interface Status {
  number: number;
  plate: string;
}

export interface GetStatusRes extends BaseRes {
  number: number; // 0 表示没有存包
  plate: string;
}

export interface HistoryItem {
  ID: number;
  SaveTime: string;
  TakeTime: string;
  Location: string;
  StuNum: number;
  StuName: string;
  SportTime: number;
}

export type HistoryList = HistoryItem[];

export interface HistoryListRes extends BaseRes {
  records: HistoryList;
}

export interface ScanRes extends BaseRes {
  plate_num: string;
  available: number;
}
