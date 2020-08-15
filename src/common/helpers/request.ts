import { request as req } from "@tarojs/taro";
import { getToken } from "@/stores/user";
import { API } from "../constants";

const request = async <ResType = any, ReqType = any>(
  key: string,
  {
    method = "GET",
    header = {},
    data,
  }: Pick<req.Option<ReqType>, "method" | "header" | "data"> = {}
) => {
  const token = await getToken();
  const res = await req<ResType, ReqType>({
    url: /^https?:\/\//.test(key) ? key : `${API}${key}`,
    method,
    header: { ...header, Authorization: `Bearer ${token}` },
    data,
  });
  return res.data;
};

export default request;

export interface BaseRes {
  status: number;
  info: string;
}
