import React from "react";
import { View, Image } from "@tarojs/components";
import styles from "./index.module.scss";

type Props = {
  isShow: boolean;
  img: string;
  title?: string;
  detail: string;
};

const Popup = ({ isShow, img, title, detail }: Props) => {
  return isShow ? (
    <View className={styles.wrapper}>
      <View className={styles.content}>
        <Image src={img} className={styles.img} />
        <View className={styles.text}>
          <View className={styles.title}>{title}</View>
          <View className={styles.detail}>{detail}</View>
        </View>
      </View>
    </View>
  ) : null;
};

export default Popup;
