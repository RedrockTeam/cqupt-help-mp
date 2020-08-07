import {
  navigateTo,
  request,
  getStorage,
  login,
  setStorage,
} from "@tarojs/taro";

export const resolvePage = (module: string, page: string) =>
  `/modules/${module}/pages/${page}/index`;

export const navTo = ({
  url,
  title = "",
  payload = {},
}: {
  url: string;
  title?: string;
  payload?: Record<string, string | number | boolean>;
}) => {
  if (/^https?:\/\//.test(url)) {
    navigateTo({
      url: urlStringify("/modules/webview/index", { url, title, ...payload }),
    });
  } else {
    navigateTo({ url: urlStringify(url, payload) });
  }
  return null;
};

function urlStringify(
  url: string,
  payload: Record<string, string | number | boolean>,
  encode = true
) {
  const arr = Object.keys(payload).map(
    (key) =>
      `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  );
  return arr.length ? `${url}?${arr.join("&")}` : url;
}

export const getToken = async (): Promise<string | undefined> => {
  try {
    const res = await getStorage({
      key: "cqupt-help-mp-token-key",
    });
    return res.data;
  } catch (e) {
    const { code } = await login();
    const { data } = await request({
      url: `https://wx.redrock.team/magicloop/rushAb?code=${code}`,
      method: "POST",
    });
    if (data.status === "10000") {
      setStorage({ key: "cqupt-help-mp-token-key", data: data.data.token });
      return data.data.token;
    }
  }
};
