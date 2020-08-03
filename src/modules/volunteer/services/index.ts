import request from "@/common/helpers/request";
import {
  CheckIsVolunteerRes,
  LoginVolunteerRes,
  VolunteerInfo,
  VolunteerActivityListInfoRes,
  VolunteerActivityDetailRes,
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

export const getVolunteerActivityDetail = (_key: string, id: number) =>
  request<VolunteerActivityDetailRes>("cyb-volunteer/volunteer/activity/info", {
    method: "POST",
    data: { id },
  });

// export const applyVolunteerActivity = (_key: string, )
