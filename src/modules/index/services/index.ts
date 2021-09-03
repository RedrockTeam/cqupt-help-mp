/*
 * @Author: your name
 * @Date: 2021-04-14 14:45:51
 * @LastEditTime: 2021-04-18 12:21:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /cqupt-help-mp/src/modules/index/services/index.ts
 */
import { login, request as TaroRequest } from "@tarojs/taro";
import request from "@/common/helpers/request";
import { ActivitiesHomeRes, ApplyActivityInfo, ApplyActivityRes } from "./dto";

export const bindReq = async ({ account, password }) => {
  const { code } = await login();
  return TaroRequest({
    url: `https://be-dev.redrock.cqupt.edu.cn/magicloop/rushAb?code=${code}`,
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
  request<ActivitiesHomeRes>("/christina-activity/activity/front/activities");

export const applyActivity = (data: ApplyActivityInfo) =>
  request<ApplyActivityRes, ApplyActivityInfo>("/cyb-myactivities/registe", {
    method: "POST",
    data,
  });
