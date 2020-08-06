import React from "react";
import { View, Image } from "@tarojs/components";
import loading from "@/static/images/loading.gif";
import styles from "./index.module.scss";

const Loading = () => {
  return (
    <View className={styles.gooey}>
      <Image src={loading} className={styles.loading} />
    </View>
  );
};

export default Loading;
