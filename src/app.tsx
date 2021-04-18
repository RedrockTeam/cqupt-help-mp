import React, { Component } from "react";
import { ReactQueryConfigProvider } from "react-query/dist/react-query.production.min";
import { getToken } from "@/stores/user";
import { redirectTo } from "@tarojs/taro";
import { resolvePage } from "./common/helpers/utils";
import PopupContext from "./stores/popup";
import "./app.scss";
import * as Sentry from "sentry-miniapp";
Sentry.init({
  dsn: "https://bcb1d19fad9c4d819cb3f51397b18e3a@sentry.redrock.team/2",
  tracesSampleRate: 1.0,
});
// Sentry.captureException(new Error("test"));
// Sentry.captureMessage("Hello, world!");
getToken().then((token) => {
  if (!token) {
    redirectTo({ url: resolvePage("index", "bind") });
  }
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