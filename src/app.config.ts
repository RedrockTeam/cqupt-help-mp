const resolvePage = (module: string, page: string) =>
  `modules/${module}/pages/${page}/index`;

export default {
  pages: [
    // resolvePage("index", "bind"),
    // resolvePage("campus", "index"),
    // resolvePage("campus", "safe-run"),
    resolvePage("campus", "safe-run-history"),
    // resolvePage("campus", "shark-it"),
    resolvePage("ticket", "rob-ticket"),
    // resolvePage("my-activity", "index"),
    // resolvePage("my-reward", "index"),
    // resolvePage("volunteer", "index"),
    // resolvePage("volunteer", "entry"),
    // resolvePage("volunteer", "detail"),
    // resolvePage("feedback", "index"),
    // resolvePage("feedback", "result"),
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#F6F6F9",
    navigationBarTitleText: "重邮帮",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
};
