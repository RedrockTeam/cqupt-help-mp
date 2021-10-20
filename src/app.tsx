/*
 * @Author: your name
 * @Date: 2021-09-01 22:01:22
 * @LastEditTime: 2021-10-08 13:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cqupt-help-mp/src/app.tsx
 */
import React, { Component } from "react";
import { ReactQueryConfigProvider } from "react-query/dist/react-query.production.min";
import { isTokenExpired } from "@/stores/user";
import PopupContext from "./stores/popup";
import "./app.scss";
import * as Sentry from "sentry-miniapp";
Sentry.init({
  dsn: "https://bcb1d19fad9c4d819cb3f51397b18e3a@sentry.redrock.team/2",
  tracesSampleRate: 1.0,
});
// Sentry.captureException(new Error("test"));
// Sentry.captureMessage("Hello, world!");

isTokenExpired()
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
