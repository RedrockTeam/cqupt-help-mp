import React from "react";
import { View, Image } from "@tarojs/components";
import error from "@/static/error.png";
import styles from "./index.module.scss";

const Error = () => {
  return (
    <View className={styles.wrap}>
      <Image className={styles.img} src={error} />
    </View>
  );
};

export default Error;
