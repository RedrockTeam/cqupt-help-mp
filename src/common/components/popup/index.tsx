import React from "react";
import { View, Image, Text } from "@tarojs/components";
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
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.detail}>{detail}</Text>
      </View>
    </View>
  ) : null;
};

export default Popup;
