import { atob } from "Base64";
import { login, request, redirectTo } from "@tarojs/taro";
import { resolvePage } from "@/common/helpers/utils";
import { useQuery } from "react-query/dist/react-query.production.min";

export const getToken = async (): Promise<string | undefined> => {
  const { code } = await login();
  const { data } = await request({
    url: `https://wx.redrock.team/magicloop/rushAb?code=${code}`,
    method: "POST",
  });
  if (data.status === "10000") {
    return data.data.token;
  }
};

export const getTheToken = (newToken?: string) => {
  let token: string | undefined;
  let getting: Promise<string | undefined> | undefined;
  if (newToken) token = newToken;
  return async () => {
    if (token) return token;
    if (getting) {
      token = await getting;
      return token;
    }
    getting = getToken();
    token = await getting;
    return token;
  };
};

const parseToken = (token: string): UserInfo =>
  JSON.parse(decodeURIComponent(escape(atob(token.split(".")[0]))));

type UserInfo = {
  college: string;
  realName: string;
  stuNum: string;
  token: string;
};
let userInfo: UserInfo | undefined;

// eslint-disable-next-line import/no-mutable-exports
export let getTokenFunc = getTheToken();

// export 出在进入 app 调用一次或者解绑后重进调用一次，获取 token 并初始化用户信息
export const getUserInfo = async (newToken?: string) => {
  let token: string | undefined;
  if (!newToken) {
    token = await getTokenFunc();
  } else {
    getTokenFunc = getTheToken(newToken);
    token = newToken;
    console.log(token)
  }
  if (!token) {
    redirectTo({ url: resolvePage("index", "bind") });
  } else {
    userInfo = parseToken(token);
    userInfo.token = token;
    console.log(userInfo);
    return userInfo;
  }
};

export const useUserInfo = () => {
  const { data } = useQuery("userInfo", () => getUserInfo());
  return data;
};
