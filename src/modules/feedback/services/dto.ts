import { BaseRes } from "@/common/helpers/request";

export interface FeedbackInfo {
  title: string;
  content: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
}

export type FeedbackInfoRes = BaseRes;
export type UploadImgRes = BaseRes;
