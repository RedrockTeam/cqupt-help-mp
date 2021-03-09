import { atob } from "Base64";
import { login, request } from "@tarojs/taro";
import { useQuery } from "react-query/dist/react-query.production.min";

let TOKEN: string | undefined;

export const genGetToken = () => {
  const getToken = async (): Promise<string | undefined> => {
    const { code } = await login();
    const { data } = await request({
      url: `https://be-prod.redrock.team/magicloop/rushAb?code=${code}`,
      method: "POST",
    });
    if (data.status === "10000") {
      return data.data.token;
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
  userInfo.token = TOKEN ?? "";
  return userInfo;
};

export const useUserInfo = () => {
  const { data } = useQuery("getToken", getToken);
  return getUserInfo(data);
};
