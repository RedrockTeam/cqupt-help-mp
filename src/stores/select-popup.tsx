/*
 * @Author: myjdml
 * @Date: 2021-04-08 20:40:23
 * @LastEditTime: 2021-04-08 20:42:54
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: \cqupt-help-mp\src\stores\select-popup.tsx
 * 
 */
import { createContainer } from "unstated-next";
import React, { useState } from "react";

const SelectPopupFun = () => {
  const [ state, setState ] = useState(false);
  const changeState = () => {
    if (state) {
      setState(false)
    } else {
      setState(true)
    }
  }
  return { state, setState , changeState }
}
const SelectPopupContext = createContainer(SelectPopupFun);

export default SelectPopupContext;

