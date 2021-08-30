import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import React, {useState, useEffect} from "react";
import {navTo, resolvePage} from "@/common/helpers/utils";
import request from "@/common/helpers/request";
import styles from "./index.module.scss";

const History = () => {
  const [questionList, setQuestionList] = useState([]);
  useEffect(() => {
    setQuestionList([
      {id: 1, title: "参与买一送一活动", date: "2021-07-25", time: "13:44", isReply: true, isView: false},
      {id: 2, title: "无法切换账号", date: "2021-07-25", time: "15:44", isReply: false, isView: true},
      {id: 3, title: "点击电费查询后数据为空", date: "2021-07-25", time: "12:44", isReply: true, isView: true},
    ])
  }, [])
  const historyItemClick = (index) => {
    return () => {
      questionList[index].isView = true;
      setQuestionList([...questionList]);
      navTo({ url: resolvePage("feedback", "result") });
    }
  }
  return (
    <View className={styles.wrapper}>
      <NavBack title="历史问题" background="#F6F6F9" />
      {questionList.length ? <></> :<View className={styles.none_feedback}>你还没有提交过反馈哦~</View>}
      {
        questionList.map((item, index) => {
        return (
          <View className={styles.history_item} key={item.id} onClick={historyItemClick(index)}>
            <View className={styles.title}>{item.title}</View>
            <View className={styles.up_time}>{item.date} &nbsp; {item.time} 提交</View>
            <View className={item.isReply ? styles.replied : styles.no_reply}>
              {item.isReply ? '已' : '未'}回复
              {item.isView ? <></> : <View className={styles.point}> </View>}
            </View>
          </View>
        )})
      }
    </View>
  );
};
export default History;
