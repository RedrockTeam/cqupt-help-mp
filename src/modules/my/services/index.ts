/* eslint-disable @typescript-eslint/camelcase */
import request from "@/common/helpers/request";
import { MyActivitiesRes, MyRewardsRes, MyRewardsApplyRes, MyReadsRes } from "./dto";

// export const getMyActivities = (_key: string) =>
//   request<MyActivitiesRes>("/cyb-myactivities/ac");

export const getMyActivities = (_key: string) =>
  request<MyActivitiesRes>("/cyb-myactivities/test/myactive");

export const getMyRewards = (_key: string) =>
  request<MyRewardsRes>("/cyb-prize/lookPrize", {
    method: "POST",
  });

export const applyMyRewards = (activity_id: number) =>
  request<MyRewardsApplyRes>("/cyb-prize/getGift", {
    method: "POST",
    data: { activity_id },
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });


export const getMyReads = (_key: string) =>
  request<MyReadsRes>("/cyb-myactivities/test/showread", {
    method: "GET",
  });