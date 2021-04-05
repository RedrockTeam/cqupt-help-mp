/*
 * @Author: myjdml
 * @Date: 2021-03-10 21:11:01
 * @LastEditors: myjdml
 * @LastEditTime: 2021-04-06 00:16:26
 * @FilePath: \cqupt-help-mp\src\app.config.ts
 * @Description: nothing is everything
 */
/* eslint-disable prettier/prettier */
const resolvePage = (module: string, page: string) =>
  `modules/${module}/pages/${page}/index`;

export default {
  pages: [
    resolvePage("ticket", "rob-ticket"),
    // resolvePage("ticket", "rob-ticket-info"),
    resolvePage("index", "home"),
    resolvePage("index", "activity-detail"),
    resolvePage("campus", "index"),
    resolvePage("campus", "safe-run"),
    resolvePage("campus", "safe-run-history"),
    resolvePage("campus", "shark-it"),
    resolvePage("volunteer", "bind"),
    resolvePage("volunteer", "index"),
    resolvePage("volunteer", "detail"),
    resolvePage("volunteer", "application"),
    // resolvePage("ticket", "rob-ticket"),
    resolvePage("ticket", "rob-ticket-info"),
    resolvePage("id", "index"),
    resolvePage("id", "apply"),
    resolvePage("my", "index"),
    resolvePage("my", "my-activity"),
    resolvePage("my", "my-reward"),
    resolvePage("ticket", "my-ticket"),
    resolvePage("account-safe", "index"),
    resolvePage("account-safe", "change"),
    resolvePage("account-safe", "protect"),
    resolvePage("account-safe", "bindemail"),
    resolvePage("account-safe", "forget"),
    resolvePage("account-safe", "checkcode"),
    resolvePage("account-safe", "checkprotect"),
    resolvePage("account-safe", "resetpassword"),
    resolvePage("feedback", "index"),
    resolvePage("feedback", "result"),
    resolvePage("index", "bind"),
    "modules/webview/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#F6F6F9",
    navigationBarTitleText: "重邮帮",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  tabBar: {
    color: "#A4A3B7",
    selectedColor: "#625AF8",
    backgroundColor: "#FFFFFF",
    borderStyle: "white",
    list: [
      {
        pagePath: resolvePage("index", "home"),
        text: "首页",
        iconPath: "static/images/home-icon.png",
        selectedIconPath: "static/images/home-active-icon.png",
      },
      {
        pagePath: resolvePage("my", "index"),
        text: "我的",
        iconPath: "static/images/my-icon.png",
        selectedIconPath: "static/images/my-active-icon.png",
      },
    ],
  },
};
