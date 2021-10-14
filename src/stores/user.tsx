import { login, redirectTo, request, getCurrentInstance } from "@tarojs/taro";
import { resolvePage } from "@/common/helpers/utils";
// 登陆逻辑
/**
 * @description: 用于储存本地用户数据
 * @Author: kyingStar
 * @Date: 2021/10/8
 */
const localUserInfo: UserInfo = {
  localOk: false, // 判断本地数据是否可用
  realName: "", // 学生真实姓名
  stuNum: "", // 学生学号
  college: "", // 学生学院
  token: "", // 用户token
};
/**
 * @description: 远程用户数据覆盖本地用户数据
 * @param e 请求拿到的用户数据
 * @Author: kyingStar
 * @Date: 2021/10/8
 */
const coverLocalUserInfo = (e): void => {
  localUserInfo.real_name = e.real_name;
  localUserInfo.stu_num = e.stu_num;
  localUserInfo.college = e.college;
  localUserInfo.token = e.token;
  localUserInfo.localOk = true;
};
/**
 * @description: 修改本地用户数据 , 用于外部环境调用 , 主要用于修改token
 * @param dataKey 需要修改的用户数据项 的 键
 * @param dataValue 需要修改的用户数据项 的 值
 * @Author: kyingStar
 * @Date: 2021/10/8
 */
export const setLocalUserInfo = (dataKey: string, dataValue: string) => {
  localUserInfo[dataKey] = dataValue;
};
/**
 * @description: 用于获取云端的用户数据
 * @return {UserInfo} 用户数据
 * @Author: kyingStar
 * @Date: 2021/10/8
 */
const getUserDataFromRemote = async (): Promise<UserInfo> => {
  const { code } = await login();
  const { data } = await request({
    url: `https://be-prod.redrock.cqupt.edu.cn/magicloop-wx/auth/enter/christina?code=${code}`,
    method: "GET",
  }).catch(() => {
    // 报错就跳转到绑定页，重走一遍绑定
    redirectTo({ url: resolvePage("index", "bind") });
  });

  if (data.status === 10000) {
    coverLocalUserInfo(data.data);
    return data.data;
  }
  if (data.status === 10020) {
    await redirectTo({ url: resolvePage("index", "bind") });
  }
  return {
    realName: "Loading...",
    stuNum: "Loading...",
    college: "Loading...",
    token: "",
  };
};

type UserInfo = {
  college: string;
  realName: string;
  stuNum: string;
  token: string;
  real_name?: string;
  stu_num?: string;
  localOk?: boolean;
};

export const getUserInfo = async () => {
  // 本地的用户数据数据库可用
  let UserInfo;
  if (localUserInfo.localOk) {
    // eslint-disable-next-line no-console
    console.log("本地数据存在");
    UserInfo = localUserInfo;
  } else {
    // 获取云上数据
    console.log("云端被调用");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    UserInfo = await getUserDataFromRemote();
  };
  return {
    realName: UserInfo.real_name,
    stuNum: UserInfo.stu_num,
    college: UserInfo.college,
    token: UserInfo.token,
  };
};

export const isTokenExpired = async () => {
  // 检测token
  console.log("检测token");
  const { token } = await getUserInfo();
  const pages = getCurrentInstance();
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (!token && pages.page.route !== "modules/index/pages/home/bind") {
    await redirectTo({ url: resolvePage("index", "bind") });
  }
};
