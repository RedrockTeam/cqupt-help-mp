import { navigateTo } from "@tarojs/taro";

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


/**
 * 解析url的param参数
 * @param url
 */
export const parseParam = (url: string) => {
  // @ts-ignore
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后⾯的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组 中
  let paramsObj = {};
// 将 params 存到对象中
  paramsArr.forEach(param => { if (/=/.test(param)) { // 处理有 value 的参数
    let [key, val] = param.split('='); // 分割 key 和 value
    val = decodeURIComponent(val); // 解 码
    // @ts-ignore
    val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
    if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加⼀个值
      paramsObj[key] = [].concat(paramsObj[key], val as any);
    } else { // 如果对象没有这个 key，创建 key 并设置值
      paramsObj[key] = val;
    }
  } else { // 处理没有 value 的参数
    paramsObj[param] = true; } })
  return paramsObj;
}
