import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { ReactQueryConfigProvider } from "react-query/dist/react-query.production.min";
import { navTo, resolvePage, getToken } from "./common/helpers/utils";
import PopupContext from "./stores/popup";
import "./app.scss";

getToken().then((token) => {
  if (!token) {
    navTo({ url: resolvePage("index", "bind") });
  }
});

Taro.loadFontFace({
  family: "PingFang SC",
  source: 'url("https://wx.redrock.team/game/PingFang_Medium.ttf")',
  success: (res) => {
    console.log(res);
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
