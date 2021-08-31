import React, {useState, useEffect} from "react";
import Taro, { switchTab } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { resolvePage } from "@/common/helpers/utils";
import NavBack from "@/common/components/nav-back";
import styles from "./index.module.scss";

const FeedbackResult = () => {
  const [question, setQuestion] = useState({});
  const [reply, setReply] = useState({});
  useEffect(() => {
    setQuestion({product_id:'1', file: "https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp",
      date: "2021-07-25", time: "13:44", title: "参与买一送一活动", content:"今天喝了脉动呐，吃了果冻呐，打了电动呐，还是挡不住对你的心动呐~", type: "系统问题"},
    );
    setReply({id: 1, date: "2021-07-25", time: "13:44", content: "滴滴，滴滴，你的问题我们已经收到了，感谢你的反馈。",
      file: "https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp", stu: "好大哥"})
  },[])
  const $instance = Taro.getCurrentInstance();
  // console.log($instance.router.params);
  // console.log(question)
  return (
    <View className={styles.wrapper}>
      <NavBack title="反馈结果" background="#F6F6F9" />
      <View className={styles.res_item}>
        <View className={styles.time}>{question.date} &nbsp; {question.time}</View>
        <View className={styles.detail_wrapper}>
          <View className={styles.title}>
            {question.title}
            <View className={styles.tag}>{question.type}</View>
          </View>
          <View className={styles.content}>
            {question.content}
          </View>
          <View className={styles.img_wrapper}>
            <Image className={styles.img} src={question.file}/>
          </View>
        </View>
      </View>
      {reply.id === undefined ? <View className={styles.un_reply}>还没有收到回复，请耐心等待哦~</View> : <></>}
      <View className={styles.res_item}>
        <View className={styles.time}>{reply.date} &nbsp; {reply.time}</View>
        <View className={styles.detail_wrapper}>
          <View className={styles.title}>
            亲爱的{reply.stu}同学：
          </View>
          <View className={styles.content}>
            {reply.content}
          </View>
          <View className={styles.img_wrapper}>
            <Image className={styles.img} src={question.file}/>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedbackResult;
