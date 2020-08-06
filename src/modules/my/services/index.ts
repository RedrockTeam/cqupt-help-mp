import request from "@/common/helpers/request";
import { MyActivitiesRes } from "./dto";

export const getMyActivities = (_key: string) =>
  request<MyActivitiesRes>("/cyb-myactivities/ac");
