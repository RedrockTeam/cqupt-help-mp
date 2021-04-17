/*
 * @Author: myjdml
 * @Date: 2021-03-23 22:51:42
 * @LastEditTime: 2021-04-14 21:21:40
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: \cqupt-help-mp\src\common\helpers\request.ts
 * 
 */
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
