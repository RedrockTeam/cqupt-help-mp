import request from "@/common/helpers/request";
import {
  CheckIsVolunteerRes,
  LoginVolunteerRes,
  VolunteerInfo,
  VolunteerActivityListInfoRes,
  VolunteerActivityDetailRes,
  VolunteerActivityApply,
  VolunteerActivityApplyRes,
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
  request<VolunteerActivityDetailRes>(
    "/cyb-volunteer/volunteer/activity/info",
    {
      method: "POST",
      data: { id },
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
