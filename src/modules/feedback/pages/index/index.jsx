import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { resolvePage, navTo } from "@/common/helpers/utils";
import {
  View,
  Button,
  Input,
  Textarea,
  Label,
  Image,
} from "@tarojs/components";
import deletePng from "@/static/images/delete.png";
import error from "@/static/images/error.png";
import NavBack from "@/common/components/nav-back";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import { useMutation } from "react-query/dist/react-query.production.min";
import { getToken } from "@/stores/user";
import { pushFeedback, getCommonQuestionList } from "@/modules/feedback/services";
import feedbackTo from "@/static/images/feedback-to.png";
import styles from "./index.module.scss";

const Feedback = () => {
  const [questionList, setQuestionList] = useState([]);
  useEffect(() => {
    getCommonQuestionList().then(res => {
      setQuestionList(res.data);
    })
  }, [])

  const copy = () => {
    Taro.setClipboardData({
      data: "948304245",
    });
  };
  return (
    <View className={styles.wrap}>
      <NavBack title="问题和反馈" background="#F6F6F9" />
      <View
        className={styles.history_btn}
        onClick={() => navTo({ url: resolvePage("feedback", "history") })}>
        历史问题
      </View>
      <View className={styles.common_ques}>
        {questionList.map((item) => (
          <View className={styles.ques_item} key={item.ID}
            onClick={() => navTo({ url: resolvePage("feedback", "commonProblem"), payload:{title: item.title,content: item.content}})}>
            {item.title}
            <Image className={styles.icon_img} src={feedbackTo}/>
          </View>
        ))}
      </View>
      <View
        className={styles.ask_question}
        onClick={() => navTo({ url: resolvePage("feedback", "edit") })}>
        问题反馈
      </View>
      <View className={styles.add_group}>
        实时反馈可添加QQ反馈群：
        <View className={styles.group_num} onClick={copy}>948304245</View>
      </View>
    </View>
  );
};

export default Feedback;
