import React from "react";
import Taro, { switchTab } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { resolvePage } from "@/common/helpers/utils";
import NavBack from "@/common/components/nav-back";
import feedback from "@/static/images/feedback.png";
import copyPng from "@/static/images/copy.png";
import styles from "./index.module.scss";

const FeedbackResult = () => {
  const copy = () => {
    Taro.setClipboardData({
      data: "948304245",
    });
  };
  return (
    <View>
      <NavBack title="问题和反馈" background="#F6F6F9" />
      <Image src={feedback} className={styles.pic} />
      <View className={styles.tips1}>了解更多反馈情况或咨询问题可添加 </View>
      <View className={styles.tips2}>
        QQ群:
        <Text style={{ color: "#625af8", paddingLeft: "15px" }}>948304245</Text>
        <Image
          src={copyPng}
          className={styles.copyPng}
          onClick={() => {
            copy();
          }}
        />
      </View>
      <Button
        className={styles.button}
        onClick={() => {
          switchTab({
            url: resolvePage("my", "index"),
          });
        }}
      >
        知道了
      </Button>
    </View>
  );
};

export default FeedbackResult;
