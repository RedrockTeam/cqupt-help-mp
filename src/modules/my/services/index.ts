/* eslint-disable @typescript-eslint/camelcase */
import request from "@/common/helpers/request";
import { MyActivitiesRes, MyRewardsRes, MyRewardsApplyRes } from "./dto";

export const getMyActivities = (_key: string) =>
  request<MyActivitiesRes>("/cyb-myactivities/ac");

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
