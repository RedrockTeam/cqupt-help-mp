import { BaseRes } from "@/common/helpers/request";

export interface FeedbackInfo {
  title: string;
  content: string;
  photo1?: any;
  photo2?: any;
  photo3?: any;
  photo4?: any;
}

export type FeedbackInfoRes = BaseRes;
export type UploadImgRes = BaseRes;
