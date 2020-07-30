// import homeIcon from "../static/images/home-icon.png";
// import homeActiveIcon from "../static/images/home-active-icon.png";
// import myIcon from "../static/images/my-icon.png";
// import myActiveIcon from "/static/images/my-active-icon.png";

const resolvePage = (module: string, page: string) =>
  `modules/${module}/pages/${page}/index`;

export default {
  pages: [
    resolvePage("index", "home"),
    resolvePage("my", "index"),
    // resolvePage("index", "bind"),
    // resolvePage("campus", "index"),
    // resolvePage("campus", "safe-run"),
    // resolvePage("campus", "safe-run-history"),
    // resolvePage("campus", "shark-it"),
    // resolvePage("ticket", "rob-ticket"),
    resolvePage("ticket", "my-ticket"),
    // resolvePage("my-activity", "index"),
    // resolvePage("my-reward", "index"),
    // resolvePage("volunteer", "index"),
    // resolvePage("volunteer", "entry"),
    // resolvePage("volunteer", "detail"),
    resolvePage("feedback", "index"),
    // resolvePage("feedback", "result"),
    // resolvePage("id", "index"),
    // resolvePage("id", "empty"),
    resolvePage("id", "apply"),
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
        pagePath: "modules/index/pages/home/index",
        text: "首页",
        iconPath: "static/images/home-icon.png",
        selectedIconPath: "static/images/home-active-icon.png",
      },
      {
        pagePath: "modules/my/pages/index/index",
        text: "我的",
        iconPath: "static/images/my-icon.png",
        selectedIconPath: "static/images/my-active-icon.png",
      },
    ],
  },
};
