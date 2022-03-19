import request from "@/common/helpers/request";
import {
  CheckIsVolunteerRes,
  LoginVolunteerRes,
  VolunteerActivityApply,
  VolunteerActivityApplyRes,
  VolunteerActivityChangeReq,
  VolunteerActivityChangeRes,
  VolunteerActivityDetailRes,
  VolunteerActivityListInfoRes,
  VolunteerActivityQuitReq,
  VolunteerActivityQuitRes,
  VolunteerActivitySignInReq,
  VolunteerActivitySignInRes,
  VolunteerInfo,
} from "./dto";

export const checkIsVolunteer = () =>
  request<CheckIsVolunteerRes>("/christina-volunteer/front/user/is");

export const loginVolunteer = (info: VolunteerInfo) =>
  request<LoginVolunteerRes, VolunteerInfo>("/christina-volunteer/front/user/register", {
    method: "POST",
    data: info,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

export const getVolunteerActivityListInfo = () =>
  request<VolunteerActivityListInfoRes>("/christina-volunteer/front/user/activities");

export const getVolunteerActivityDetail = (activity_id: string) =>
  request<VolunteerActivityDetailRes>(
    "/christina-volunteer/front/activity/info",
    {
      method: "GET",
      data: { activity_id }
    }
  );

//  改成mutation配合useDidShow提升性能( change-time )
export const getVolunteerActivityDetailMutation = (data: { rely_id: string }) =>
  request<VolunteerActivityDetailRes>(
    "/christina-volunteer/volunteer/activity/info",
    {
      method: "POST",
      data: { rely_id: data.rely_id },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

export const applyVolunteerActivity = (data: VolunteerActivityApply) =>
  request<VolunteerActivityApplyRes, VolunteerActivityApply>(
    "/christina-volunteer/volunteer/activity/apply",
    {
      method: "POST",
      data,
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

/**
 * 更新活动已读状态 -- 已改成mutation
 */
export const postVolunteerActivityRead = ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  volunteer_list_id,
}: {
  volunteer_list_id: string;
}) =>
  request("/christina-volunteer/front/user/read", {
    method: "POST",
    data: { volunteer_list_id },
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

/**
 * 退出志愿活动
 * @param data : VolunteerActivityQuitReq
 */
export const postVolunteerActivityQuit = (data: VolunteerActivityQuitReq) =>
  request<VolunteerActivityQuitRes, VolunteerActivityQuitReq>("/christina-volunteer/front/user/quit", {
    method: "POST",
    data,
    header: {
      "content-type": "application/x-www-form-urlencoded ",
    },
  });

/**
 * 更改志愿活动班次
 * @param data : VolunteerActivityChangeReq
 */
export const postVolunteerActivityChange = (data: VolunteerActivityChangeReq) =>
  request<VolunteerActivityChangeRes, VolunteerActivityChangeReq>("/christina-volunteer/front/user/change", {
    method: "POST",
    data,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

/**
 * 活动签到
 * @param code_id
 * @param data
 */
export const postVolunteerActivitySignIn = ({
  code,
  data,
}: {
  code: string;
  data: VolunteerActivitySignInReq;
}) =>
  request<VolunteerActivitySignInRes>(`/christina-volunteer/front/user/sign?code=${code}`, {
    method: "POST",
    data,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
