import { atob } from "Base64";
import { login, request } from "@tarojs/taro";
import { navTo, resolvePage } from "@/common/helpers/utils";

export const getToken = async (
  refresh = false
): Promise<string | undefined> => {
  let token: string | undefined;
  if (!refresh && token) {
    return token;
  }
  const { code } = await login();
  const { data } = await request({
    url: `https://wx.redrock.team/magicloop/rushAb?code=${code}`,
    method: "POST",
  });
  if (data.status === "10000") {
    token = data.data.token;
    return token;
  }
};

const parseToken = (token: string): UserInfo =>
  JSON.parse(decodeURIComponent(escape(atob(token.split(".")[0]))));

type UserInfo = {
  college: string;
  realName: string;
  stuNum: string;
  token: string;
};
let userInfo: UserInfo;

// export 出在 app 调用一次，获取 token 并初始化用户信息
export const checkToken = async (refresh = false) => {
  const token = await getToken(refresh);
  if (!token) {
    navTo({ url: resolvePage("index", "bind") });
  } else {
    userInfo = parseToken(token);
    userInfo.token = token;
    console.log(userInfo)
  }
};

const getUserInfo = () => userInfo;
export default getUserInfo;
