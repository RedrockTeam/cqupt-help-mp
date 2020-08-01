import React from "react";
import { View } from "@tarojs/components";
import styles from "./index.module.scss";

const Loading = () => {
  return (
    <View className={styles.gooey}>
      <View className={styles.dot} />
      <View className={styles.dots}>
        <View className={styles.dd} />
        <View className={styles.dd} />
        <View className={styles.dd} />
      </View>
    </View>
  );
};

export default Loading;
