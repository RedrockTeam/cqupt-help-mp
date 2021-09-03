import React, {useState, useEffect} from "react";
import Taro, { switchTab } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { resolvePage } from "@/common/helpers/utils";
import NavBack from "@/common/components/nav-back";
import defaultIcon1 from "@/static/images/feedback-default1.png"
import {getHistoryQuestionDetail} from "@/modules/feedback/services";
import styles from "./index.module.scss";

const FeedbackResult = () => {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const [replied, setReplied] = useState(false);
  const [questionTime, setQuestionTime] = useState({});
  const [replyTime, setReplyTime] = useState({});
  useEffect(() => {
    const $instance = Taro.getCurrentInstance();
    const { id } = $instance.router.params;
    getHistoryQuestionDetail({feedback_id: id}).then(res => {
      const { data } = res;
      const { title, type, content, pictures, UpdatedAt, name } = data.feedback;
      setQuestionTime({
        date: UpdatedAt.slice(0, 10),
        time: UpdatedAt.slice(11, 16),
      });
      setQuestion({type, title, content, pictures});
      if (!data.reply) setReplied(false);
      else {
        const { UpdatedAt, content, urls } = data.reply;
        setReplyTime({
          date: UpdatedAt.slice(0, 10),
          time: UpdatedAt.slice(11, 16),
        });
        setReplied(true);
        setAnswer({ UpdatedAt, content, urls, name });
      }
    });
  },[])
  return (
    <View className={styles.wrapper}>
      <NavBack title="反馈结果" background="#F6F6F9" />
      <View className={styles.res_item}>
        <View className={styles.time}>{questionTime.date} &nbsp; {questionTime.time}</View>
        <View className={styles.detail_wrapper}>
          <View className={styles.title}>
            {question.title}
            <View className={styles.tag}>{question.type}</View>
          </View>
          <View className={styles.content}>
            {question.content}
          </View>
          {
            question.pictures ? (
              <View className={styles.img_wrapper}>
              {
                question.pictures.map((imgSrc) => <Image className={styles.img} src={imgSrc}/>)
              }
              </View>
            ) : <></>
          }
        </View>
      </View>
      {!replied ? (
        <View className={styles.un_reply}>
          <Image className={styles.icon} src={defaultIcon1} />
          还没有收到回复，请耐心等待哦~
        </View>) : (
        <View className={styles.res_item}>
          <View className={styles.time}>{replyTime.date} &nbsp; {replyTime.time}</View>
          <View className={styles.detail_wrapper}>
            <View className={styles.title}>
              亲爱的{answer.name}同学：
            </View>
            <View className={styles.content}>
              {answer.content}
            </View>
            <View className={styles.img_wrapper}>
              {
                answer.urls.map((picSrc) => <Image className={styles.img} src={picSrc}/>)
              }
            </View>
          </View>
        </View>)}
    </View>
  );
};

export default FeedbackResult;
