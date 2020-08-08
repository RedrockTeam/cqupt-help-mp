import React, { Component } from "react";
import { requestSubscribeMessage, showModal } from "@tarojs/taro";
import { ReactQueryConfigProvider } from "react-query/dist/react-query.production.min";
import { navTo, resolvePage, getToken } from "./common/helpers/utils";
import PopupContext from "./stores/popup";
import "./app.scss";

getToken().then((token) => {
  if (!token) {
    navTo({ url: resolvePage("index", "bind") });
  }
});

showModal({
  title: "提示",
  content: "订阅消息推送",
  success(res) {
    if (res.confirm) {
      requestSubscribeMessage({
        tmplIds: ["fM1Jx8XieAXy4VGNHCptnVTlwLjcT-tr0adXY9w9rU8"],
      });
    } else if (res.cancel) {
      console.log("用户点击取消");
    }
  },
});
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <ReactQueryConfigProvider
        config={{
          mutations: {
            throwOnError: true,
          },
        }}
      >
        <PopupContext.Provider>{this.props.children}</PopupContext.Provider>
      </ReactQueryConfigProvider>
    );
  }
}

export default App;
