import request from "@/common/helpers/request";
import {
  CheckIsVolunteerRes,
  LoginVolunteerRes,
  VolunteerInfo,
  VolunteerActivityListInfoRes,
  VolunteerActivityDetailRes,
  VolunteerActivityApply,
  VolunteerActivityApplyRes,
  VolunteerActivityApplicationRes,
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
  request<VolunteerActivityListInfoRes>("/cyb-volunteer/new/voaces/test");

export const getVolunteerActivityDetail = (_key: string, id: string) =>
  request<VolunteerActivityDetailRes>("/cyb-volunteer/new/voactail/test", {
    method: "POST",
    data: { id },
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

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

export const getVolunteerActivityApllication = (_key: string, id: string) =>
  request<VolunteerActivityApplicationRes>(
    // url,
    '/cyb-volunteer/volunteer/activity/application',
    {
      method: "GET",
      data: { id }
    }
  )
