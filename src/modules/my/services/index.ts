import request from "@/common/helpers/request";
import {MyActivitiesRes, MyReadsRes, MyRewardsApplyRes, MyRewardsRes,} from "./dto";

export const getMyActivities = (_key: string) =>
  request<MyActivitiesRes>("/christina-activity/activity/front/activity");

export const getMyRewards = (_key: string) =>
  request<MyRewardsRes>("/cyb-prize/lookPrize", {
    method: "POST",
  });

export const applyMyRewards = (activity_id: number) =>
  request<MyRewardsApplyRes>("/cyb-prize/getGift", {
    method: "POST",
    data: {activity_id},
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
/**
 * @description: 获取志愿活动小红点
 * @param {*}
 * @return {*}
 * @Author: kyingStar
 * @Date: 2021/9/2
 */
export const getMyVolunteerReads = (_key: string) =>
  request<MyReadsRes>("/cyb-volunteer/front/user/showRead", {
    method: "GET",
  });
/**
 * @description: 获取普通活动小红点
 * @Author: kyingStar
 * @Date: 2021/9/2
 */
export const getMyActivityReads = (_key: string) =>
  request<MyReadsRes>("/christina-activity/activity/front/badge", {
    method: "GET",
  });
