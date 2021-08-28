import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { resolvePage, navTo } from "@/common/helpers/utils";
import {
  View,
  Button,
  Input,
  Textarea,
  Label,
  Image
} from "@tarojs/components";
import deletePng from "@/static/images/delete.png";
import error from "@/static/images/error.png";
import NavBack from "@/common/components/nav-back";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import { useMutation } from "react-query/dist/react-query.production.min";
import { getToken } from "@/stores/user";
import { pushFeedback } from "../../services";
import styles from "./index.module.scss";

const Feedback = () => {


  return (
    <View>
      <View onClick={() => navTo({ url: resolvePage("feedback", "commonProblem") })}>常见问题</View>
      <View onClick={() => navTo({ url: resolvePage("feedback", "history") })}>历史问题</View>;
      <View onClick={() => navTo({ url: resolvePage("feedback", "edit") })}>提出问题</View>;

    </View>

)
  ;
};

export default Feedback;
