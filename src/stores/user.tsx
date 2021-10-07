import { atob } from "Base64";
import { login, redirectTo, request } from "@tarojs/taro";
import { useQuery } from "react-query/dist/react-query.production.min";
import { resolvePage } from "@/common/helpers/utils";

let TOKEN: string | undefined;

export const genGetToken = () => {
  const getToke n = async (): Promise<string | undefined> => {
    const { code } = await login();
    const { data } = await request({
      url: `https://be-prod.redrock.cqupt.edu.cn/magicloop/rushAb?code=${code}`,
      method: "POST",
    }).catch(e => {
      redirectTo({ url: resolvePage("index", "bind") });
    })
    if (data.status === "10000") {
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

export const getUserInfo = (token: string | undefined) => {
  if (!token)
    return {
      realName: "Loading...",
      stuNum: "Loading...",
      college: "Loading...",
      token: "",
    };
  const userInfo = parseToken(token);
  // console.log("info");
  // console.log(userInfo);
  userInfo.token = TOKEN ?? "";
  console.log(userInfo);
  return {
    realName: userInfo.Data.real_name,
    stuNum: userInfo.Data.stu_num,
    token: token
  };
};

export const useUserInfo = () => {
  const { data } = useQuery("getToken", getToken);
  console.log("token111");
  console.log(data);
  return getUserInfo(data);
};
