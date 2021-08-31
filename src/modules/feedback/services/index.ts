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

export const getCommonQuestionList = () =>
  request("https://yapi.redrock.team/mock/230/feedback-center/question/list")

export const getHistoryQuestionList = () =>
  request("https://yapi.redrock.team/mock/230/feedback-center/feedback/list");

export const getHistoryQuestionDetail = (data) =>
  request("https://yapi.redrock.team/mock/230/feedback-center/feedback/view", {
    data,
  })
