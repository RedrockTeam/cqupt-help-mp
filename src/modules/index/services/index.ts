import {login, request as TaroRequest} from "@tarojs/taro";
import request from "@/common/helpers/request";
import {ActivitiesHomeRes, ApplyActivityInfo, ApplyActivityRes} from "./dto";

export const bindReq = async ({account, password}) => {
  const {code} = await login();
  return TaroRequest({
    url: `https://be-prod.redrock.team/magicloop/rushAb?code=${code}`,
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: {
      stuNum: account,
      idNum: password,
    },
  }).then((res) => res.data);
};

export const getHomeActivities = (_key: string) =>
  request<ActivitiesHomeRes>("/cyb-myactivities/allac");

export const applyActivity = (data: ApplyActivityInfo) =>
  request<ApplyActivityRes, ApplyActivityInfo>("/cyb-myactivities/re", {
    method: "POST",
    data,
  });
