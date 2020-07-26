import React from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import styles from "./index.module.scss";

const FeedbackResult = () => {
  const copy = () => {
    Taro.setClipboardData({
      data: "1234",
      success: function () {},
    });
  };
  return (
    <View>
      <View className={styles.pic}></View>
      <View className={styles.tips1}>了解更多反馈情况或咨询问题可添加 </View>
      <View className={styles.tips2}>
        QQ群<Text>2576373041</Text>
      </View>
      <Button
        onClick={() => {
          copy();
        }}
      >
        点我复制QQ群号
      </Button>
      <Button className={styles.button}>知道了</Button>
    </View>
  );
};

export default FeedbackResult;
