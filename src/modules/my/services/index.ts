import request from "@/common/helpers/request";
import {
  MyActivitiesRes,
  MyRewardsRes,
  MyRewardsApplyRes,
  MyReadsRes,
} from "./dto";

export const getMyActivities = (_key: string) =>
  request<MyActivitiesRes>("/cyb-myactivities/myactive");

export const getMyRewards = (_key: string) =>
  request<MyRewardsRes>("/cyb-prize/lookPrize", {
    method: "POST",
  });

// eslint-disable-next-line @typescript-eslint/camelcase
export const applyMyRewards = (activity_id: number) =>
  request<MyRewardsApplyRes>("/cyb-prize/getGift", {
    method: "POST",
    data: { activity_id },
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

export const getMyReads = (_key: string) =>
  request<MyReadsRes>("/cyb-myactivities/showread", {
    method: "GET",
  });
