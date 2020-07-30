import React from "react";
import { View, Image, Text } from "@tarojs/components";
import styles from "./index.module.scss";

type Props = {
  isShow: boolean;
  img?: string;
  title?: string;
  detail: string;
  bottom?: React.ReactNode;
  className?: string;
};

const Popup = ({ isShow, img, title, detail, bottom, className }: Props) => {
  return isShow ? (
    <View className={styles.wrapper}>
      <View className={`${styles.content} ${className}`}>
        {img ? (
          <Image src={img} mode="aspectFit" className={styles.img} />
        ) : null}
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.detail}>{detail}</Text>
        {bottom}
      </View>
    </View>
  ) : null;
};

export default Popup;