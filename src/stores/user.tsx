import { atob } from "Base64";
import { login, request } from "@tarojs/taro";
import { navTo, resolvePage } from "@/common/helpers/utils";

const getToken = async (): Promise<string | undefined> => {
  let token: string | undefined;
  if (token) {
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
export const checkToken = async () => {
  const token = await getToken();
  if (!token) {
    navTo({ url: resolvePage("index", "bind") });
  } else {
    userInfo = parseToken(token);
    userInfo.token = token;
  }
};

const getUserInfo = () => {
  while (!userInfo) {
    // 阻塞，保证 userInfo 已初始化
    console.log("zz");
  }
  return userInfo;
};
export default getUserInfo;
