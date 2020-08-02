import { request as req } from "@tarojs/taro";
import { API } from "../constants";
import { getToken } from "./utils";

const request = async (
  key: string,
  method?:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT",
  header: Record<string, any> = {},
  data?: any
) => {
  const token = await getToken();

  const res = await req({
    url: `${API}${key}`,
    method,
    header: { ...header, Authorization: `Bearer ${token}` },
    data,
  });
  return res.data;
};

export default request;
