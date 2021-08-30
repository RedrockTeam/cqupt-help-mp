import React, {useState, useEffect} from "react";
import Taro, { switchTab } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { resolvePage } from "@/common/helpers/utils";
import NavBack from "@/common/components/nav-back";
import styles from "./index.module.scss";

const FeedbackResult = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    setFeedbackList([
      {product_id:'1', file: "https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp", date: "2021-07-25", time: "13:44", title: "参与买一送一活动", content:"今天喝了脉动呐，吃了果冻呐，打了电动呐，还\n" +
          "是挡不住对你的心动呐~", type: "系统问题"},
      {product_id:'2', file: "https://pic3.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpg?source=172ae18b", date: "2021-07-25", time: "13:44", title: "亲爱的xx同学：", content:"滴滴，滴滴，你的问题我们已经收到了，感谢你\n" +
        "的反馈。", type: "意见建议"},
      {product_id:'3', file: "https://pic3.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpg?source=172ae18b", date: "2021-07-25", time: "13:44", title: "参与买一送一活动", content:"", type:"其他"}
    ]);
  },[])
  return (
    <View className={styles.wrapper}>
      <NavBack title="反馈结果" background="#F6F6F9" />
      {
        feedbackList.map((feedback, index) => {
          return (
            <View className={styles.res_item} key={feedback.product_id}>
              <View className={styles.time}>{feedback.date} &nbsp; {feedback.time}</View>
              <View className={styles.detail_wrapper}>
                <View className={styles.title}>
                  {feedback.title}
                  {feedback.title === "亲爱的xx同学：" ? <></> : <View className={styles.tag}>{feedback.type}</View>}
                </View>
                <View className={styles.content}>
                  {feedback.content}
                </View>
                <View className={styles.img_wrapper}>
                  <Image className={styles.img} src={feedback.file}/>
                </View>
              </View>
            </View>
          )
        })
      }

    </View>
  );
};

export default FeedbackResult;
