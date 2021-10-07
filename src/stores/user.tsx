/*
 * @Author: your name
 * @Date: 2021-09-04 17:08:57
 * @LastEditTime: 2021-10-07 21:56:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cqupt-help-mp/src/stores/user.tsx
 */
import { atob } from "Base64";
import { login, redirectTo, request } from "@tarojs/taro";
import { useQuery } from "react-query/dist/react-query.production.min";
import { resolvePage } from "@/common/helpers/utils";

let TOKEN: string | undefined;

export const genGetToken = () => {
  const getToken = async (): Promise<string | undefined> => {
    const { code } = await login();
    const { data } = await request({
      url: `https://be-prod.redrock.cqupt.edu.cn/magicloop-wx/auth/enter/christina?code=${code}`,
      method: "GET",
    }).catch(e => {
      redirectTo({ url: resolvePage("index", "bind") });
    })
    console.log(114514)
    console.log(data);

    if (data.status === "10000") {
      localStorage.setItem("realName", data.data.real_name)
      localStorage.setItem("stuNum", data.data.stu_num)
      localStorage.setItem("college", data.data.college)
      localStorage.setItem("token", data.data.token)
      return data.data.token;
    }
    if (data.status === "10020") {
      redirectTo({ url: resolvePage("index", "bind") });
    }
  };
  let getting: Promise<string | undefined> | undefined;
  return async () => {
    if (TOKEN) return TOKEN;
    if (getting) {
      TOKEN = await getting;
      return TOKEN;
    }
    getting = getToken();
    TOKEN = await getting;
    return TOKEN;
  };
};

export const getToken = genGetToken();
export const setToken = (newToken: string) => {
  TOKEN = newToken;
};

const parseToken = (token: string): UserInfo =>
  JSON.parse(decodeURIComponent(escape(atob(token.split(".")[0]))));

type UserInfo = {
  stu_num: string;
  real_name: string;
  college: string;
  realName: string;
  stuNum: string;
  token: string;
};

export const getUserInfo = () => {
  if (!localStorage.getItem("realName"))
    return {
      realName: "Loading...",
      stuNum: "Loading...",
      college: "Loading...",
      token: "",
    };
  return {
    realName: localStorage.getItem("realName"),
    stuNum: localStorage.getItem("realName"),
    college: localStorage.getItem("college"),
    token: localStorage.getItem("token")
  };
};
