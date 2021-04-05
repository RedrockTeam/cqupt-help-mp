import request from "@/common/helpers/request";
import {
  CheckIsVolunteerRes,
  LoginVolunteerRes,
  VolunteerInfo,
  VolunteerActivityListInfoRes,
  VolunteerActivityDetailRes,
  VolunteerActivityApply,
  VolunteerActivityApplyRes,
  // VolunteerActivityApplicationRes,
} from "./dto";

export const checkIsVolunteer = (_key: string) =>
  request<CheckIsVolunteerRes>("/cyb-volunteer/volunteer/is");

export const loginVolunteer = (info: VolunteerInfo) =>
  request<LoginVolunteerRes, VolunteerInfo>("/cyb-volunteer/volunteer/login", {
    method: "POST",
    data: info,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

export const getVolunteerActivityListInfo = (_key: string) =>
  request<VolunteerActivityListInfoRes>("/cyb-volunteer/volunteer/activities");

export const getVolunteerActivityDetail = (_key: string, rely_id: string) =>
  request<VolunteerActivityDetailRes>(
    "/cyb-volunteer/volunteer/activity/info",
    {
      method: "POST",
      data: { rely_id },
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

export const postVolunteerActivityRead = (
  _key: string,
  registration_time: string
) =>
  request("/cyb-myactivities/read", {
    method: "POST",
    data: { registration_time },
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
