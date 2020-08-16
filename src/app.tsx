import React, { Component } from "react";
import { ReactQueryConfigProvider } from "react-query/dist/react-query.production.min";
import { getUserInfo } from "@/stores/user";
import PopupContext from "./stores/popup";
import "./app.scss";

getUserInfo();

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
