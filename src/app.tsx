import React, { Component } from "react";
import { navTo, resolvePage, getToken } from "./common/helpers/utils";
import PopupContext from "./stores/popup";
import "./app.scss";
import "./wdyr";

if (!getToken()) {
  navTo({ url: resolvePage("index", "bind") });
}

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  // this.props.children 是将要会渲染的页面
  render() {
    return <PopupContext.Provider>{this.props.children}</PopupContext.Provider>;
  }
}

export default App;
