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

function createFormData(params = {}, boundary = '') {
  let result = '';
  for (let i in params) {
    result += `\r\n--${boundary}`;
    result += `\r\nContent-Disposition: form-data; name="${i}"`;
    result += '\r\n';
    result += `\r\n${params[i]}`
  }
  // 若是obj不为空，则最后一行加上boundary
  if (result) {
    result += `\r\n--${boundary}`
  }
  return result
}

export const pushFeedbackTest = (data) =>{
  const boundary = `--------------------------${new Date().getTime()}`;
  const formData = createFormData(data, boundary);
  console.log(formData)
  return request(
    "https://be-prod.redrock.cqupt.edu.cn/feedback-center/feedback/create",
    {
      method: "POST",
      data: formData,
      header: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      }
    }
  );
}

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
  request(
    "https://be-prod.redrock.cqupt.edu.cn/feedback-center/question/list?product_id=2"
  );

export const getHistoryQuestionList = () =>
  request(
    "https://be-prod.redrock.cqupt.edu.cn/feedback-center/feedback/list?product_id=2"
  );

export const getHistoryQuestionDetail = (data) => request(
    `https://be-prod.redrock.cqupt.edu.cn/feedback-center/feedback/view?product_id=2`,{data}
)
