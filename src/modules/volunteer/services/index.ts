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

export const checkIsVolunteer = (_key: string) =>
  request<CheckIsVolunteerRes>("/cyb-volunteer/front/is");

export const loginVolunteer = (info: VolunteerInfo) =>
  request<LoginVolunteerRes, VolunteerInfo>("/cyb-volunteer/front/login", {
    method: "POST",
    data: info,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

export const getVolunteerActivityListInfo = (_key: string) =>
  request<VolunteerActivityListInfoRes>("/cyb-volunteer/front/user/activities");

export const getVolunteerActivityDetail = (_key: string, rely_id: string) =>
  request<VolunteerActivityDetailRes>(
    "/cyb-volunteer/front/activity/info",
    {
      method: "POST",
      data: { rely_id },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

//  改成mutation配合useDidShow提升性能( change-time )
export const getVolunteerActivityDetailMutation = (data: { rely_id: string }) =>
  request<VolunteerActivityDetailRes>(
    "/cyb-volunteer/volunteer/activity/info",
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
    "/cyb-volunteer/volunteer/activity/apply",
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
  registration_time,
}: {
  registration_time: string;
}) =>
  request("/cyb-myactivities/read", {
    method: "POST",
    data: { RegistrationTime: registration_time },
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

/**
 * 退出志愿活动
 * @param data : VolunteerActivityQuitReq
 */
export const postVolunteerActivityQuit = (data: VolunteerActivityQuitReq) =>
  request<VolunteerActivityQuitRes>("/cyb-myactivities/quit", {
    method: "POST",
    data,
    header: {
      "content-type": "application/json",
    },
  });

/**
 * 更改志愿活动班次
 * @param data : VolunteerActivityChangeReq
 */
export const postVolunteerActivityChange = (data: VolunteerActivityChangeReq) =>
  request<VolunteerActivityChangeRes>("/cyb-myactivities/change", {
    method: "POST",
    data,
    header: {
      "content-type": "application/json",
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
  request<VolunteerActivitySignInRes>(`/cyb-myactivities/sign?${code}`, {
    method: "POST",
    data,
    header: {
      "content-type": "application/json",
    },
  });
