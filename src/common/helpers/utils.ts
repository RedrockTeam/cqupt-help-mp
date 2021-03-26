import { navigateTo } from "@tarojs/taro";
import {timestampToDayjs} from "@/common/helpers/date";

export const resolvePage = (module: string, page: string) =>
  `/modules/${module}/pages/${page}/index`;

export const navTo = ({
  url,
  payload = {},
  encode = false,
}: {
  url: string;
  payload?: Record<string, string | number | boolean>;
  encode?: boolean;
}) => {
  if (/^https?:\/\//.test(url)) {
    navigateTo({
      url: urlStringify("/modules/webview/index", { url, ...payload }, encode),
    });
  } else {
    navigateTo({ url: urlStringify(url, payload, encode) });
  }
  return null;
};

function urlStringify(
  url: string,
  payload: Record<string, string | number | boolean>,
  encode: boolean
) {
  const arr = Object.keys(payload).map(
    (key) =>
      `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  );
  return arr.length ? `${url}?${arr.join("&")}` : url;
}

/**
 * 只显示部门 不显示组织
 * @param param
 */
export const getString = (param: string) => {
  const index = param.lastIndexOf("—");
  if (index === -1) return param;
  return param.substring(0, index);
};
