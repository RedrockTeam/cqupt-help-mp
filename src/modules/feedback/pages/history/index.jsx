import { View, Image } from "@tarojs/components";
import { setStorage, getStorage } from "@tarojs/taro"
import NavBack from "@/common/components/nav-back";
import React, { useState, useEffect } from "react";
import { navTo, resolvePage } from "@/common/helpers/utils";
import request from "@/common/helpers/request";
import { getHistoryQuestionList } from "@/modules/feedback/services";
import defaultIcon2 from "@/static/images/feedback-default2.png"
import styles from "./index.module.scss";

const History = () => {
  const [questionList, setQuestionList] = useState([]);
  const [viewList, setViewList] = useState([false]);
  const [updateList, setUpdateList] = useState([])
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  useEffect(() => {
    getHistoryQuestionList().then(res => {
      const list = [];
      const { feedbacks } = res.data;
      const reversedBack = feedbacks.reverse()
      setQuestionList(reversedBack);
      const tempTime = [];
      const tempDate = [];
      const tempViewList = [];
      reversedBack.forEach((ele) => {
        tempDate.push(ele.UpdatedAt.slice(0, 10));
        tempTime.push(ele.UpdatedAt.slice(11, 16));
        list.push({id: ele.ID, UpdatedAt: ele.UpdatedAt})
      });
      getStorage({
        key: "list",
        success: (res) => {
          const list = JSON.parse(res.data)
          list.forEach((ele, index) => {
            if (!ele.isClick) {
              tempViewList.push(false);
            }else {
              tempViewList.push(true);
            }
          })
          setViewList([...tempViewList])
        },
        fail: () => {
          setStorage({key: "list", data: []})
        }
      })
      setTime([...tempTime]);
      setDate([...tempDate]);
    });

  }, []);
  const historyItemClick = (index) => {
    return () => {
      const { ID } = questionList[index];
      viewList[index] = true;
      setViewList([...viewList])
      getStorage({
        key: "list",
        success: (res) => {
          const list = JSON.parse(res.data);
          let i;
          const clickItem = list.find((obj, index) => {
            i = index;
            return obj.id === ID;
          })
          list[i].isClick = true;
          setStorage({key: "list", data: list});
        }
      })
      navTo({ url: resolvePage("feedback", "result"), payload: { id: ID} });
    }
  }
  return (
    <View className={styles.wrapper}>
      <NavBack title="历史问题" background="#F6F6F9" />
      {questionList.length ? <></> :<View className={styles.none_feedback}><Image className={styles.icon} src={defaultIcon2}/>你还没有提交过反馈哦~</View>}
      {
        questionList.map((item, index) => {
        return (
          <View className={styles.history_item} key={item.ID} onClick={historyItemClick(index)}>
            <View className={styles.title}>{item.title}</View>
            <View className={styles.up_time}>{date[index]} &nbsp; {time[index]}提交</View>
            <View className={item.replied ? styles.replied : styles.no_reply}>
              {item.replied ? '已' : '未'}回复
              {viewList[index] ? <></> : <View className={styles.point}> </View>}
            </View>
          </View>
        )})
      }
    </View>
  );
};
export default History;
