const resolvePage = (module: string, page: string) =>
  `modules/${module}/pages/${page}/index`;

export default {
  pages: [
    resolvePage("my-activity", "index"),
    resolvePage("my-reward", "index"),
    resolvePage("volunteer", "index"),
    resolvePage("volunteer", "entry"),
    resolvePage("volunteer", "detail"),
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#F6F6F9",
    navigationBarTitleText: "重邮帮",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
};
