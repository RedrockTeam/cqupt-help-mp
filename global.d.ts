declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

/**
 * react-query 类型 hack，详见 [NervJS/taro#6739](https://github.com/NervJS/taro/issues/6739)
 */
declare module "react-query/dist/react-query.production.min" {
  export * from "react-query";
}

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV:
      | "weapp"
      | "swan"
      | "alipay"
      | "h5"
      | "rn"
      | "tt"
      | "quickapp"
      | "qq"
      | "jd";
    [key: string]: any;
  };
};
