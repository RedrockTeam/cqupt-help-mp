import { BaseRes } from "@/common/helpers/request";

export interface FeedbackInfo {
  title: string;
  content: string;
  photo1?: string | undefined;
  photo2?: string | undefined;
  photo3?: string | undefined;
  photo4?: string | undefined;
}

export type FeedbackInfoRes = BaseRes;
export type UploadImgRes = BaseRes;
