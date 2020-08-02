import { login, request } from "@tarojs/taro";

export const bindReq = async ({ account, password }) => {
  const { code } = await login();
  return request({
    url: `https://wx.redrock.team/magicloop/rushAb?code=${code}`,
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: {
      stuNum: account,
      idNum: password,
    },
  }).then((res) => res.data);
};
