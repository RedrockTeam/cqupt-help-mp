import React, { useState } from "react";
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
import feedbackTo from "@/static/images/feedback-to.png";
import { pushFeedback } from "../../services";
import styles from "./index.module.scss";

const Feedback = () => {
  const [questionList, setQuestionList] = useState([
    {title:"如何查看我的课表", id: 1},
    {title:"怎么才能把我的课表放到桌面鸭", id: 2},
    {title:"如何取消用户屏蔽", id: 3},
    {title:"如何查看我的志愿时长", id: 4},
    {title:"如何使用没课约", id: 5},
    {title:"掌上重邮社区管理条例", id: 6},
  ]);

  return (
    <View className={styles.wrap}>
      <NavBack title="问题和反馈" background="#F6F6F9" />
      <View
        className={styles.history_btn}
        onClick={() => navTo({ url: resolvePage("feedback", "history") })}>
        历史问题
      </View>
      <View
        className={styles.common_ques}
        onClick={() => navTo({ url: resolvePage("feedback", "commonProblem") })}>
        {questionList.map((item) => (
          <View className={styles.ques_item} key={item.id}>
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
        <View className={styles.group_num}>2576373041</View>
      </View>
    </View>
  );
};

export default Feedback;
