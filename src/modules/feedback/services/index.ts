import request from "@/common/helpers/request";
import { FeedbackInfo, FeedbackInfoRes, UploadImgRes } from "./dto";

export const pushFeedback = (data: FeedbackInfo) =>
  request<FeedbackInfoRes, FeedbackInfo>("/cyb-messagepush/feedback", {
    method: "POST",
    data,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

export const uploadImg = (file) => {
  request<UploadImgRes>("/cyb-permissioncenter/upload/file", {
    method: "POST",
    data: file,
    header: {
      "content-type": "multipart/form-data",
    },
  });
};

export const pushFeedbackTest = (data: FeedbackInfo) =>
  request<FeedbackInfoRes, FeedbackInfo>("https://yapi.redrock.team/mock/230/feedback-center/feedback/create", {
    method: "POST",
    data,
    header: {
        "content-type": "application/x-www-form-urlencoded",
        "authorization": "Bearer [token]",
    },
  });
