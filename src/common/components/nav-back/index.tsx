import React from "react";
import { navigateBack } from "@tarojs/taro";
import NavBar from "taro3-navigationbar";

type Props = {
  title: string;
  background: "#FFFFFF" | "#F6F6F9";
};

/**
 * 自定义 navigation bar，左上角是回退按钮的
 */
const NavBack = ({ title, background }: Props) => {
  const handleBack = () => navigateBack();
  return (
    <NavBar
      title={title}
      color="#1C184C"
      background={background}
      back
      onBack={handleBack}
    />
  );
};

export default NavBack;
