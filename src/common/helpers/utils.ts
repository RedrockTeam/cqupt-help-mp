import { navigateTo } from "@tarojs/taro";

export const resolvePage = (module: string, page: string) =>
  `/modules/${module}/pages/${page}/index`;

export const navTo = ({
  url,
  title,
  payload = {},
}: {
  url: string;
  title: string;
  payload?: Record<string, string | number | boolean>;
}) => {
  if (/^https?:\/\//.test(url)) {
    navigateTo({ url: urlStringify("/modules/webview/index", { url, title }) });
  } else {
    navigateTo({ url: urlStringify(url, payload) });
  }
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
