import React from "react";
import { View, Image, Text } from "@tarojs/components";
import styles from "./index.module.scss";

export type Props = {
  isShow: boolean;
  img?: string;
  title?: string;
  detail?: string;
  bottom?: React.ReactNode;
  className?: string;
};

const Popup = ({ isShow, img, title, detail, bottom, className }: Props) => {
  return (
    <View className={`${styles.wrapper} ${isShow ? styles.show : styles.hide}`}>
      <View className={`${styles.content} ${className}`}>
        {img ? (
          <Image src={img} mode="aspectFit" className={styles.img} />
        ) : null}
        {title ? (
          <Text className={styles.title}>{title}</Text>
          ) : null
        }
        <Text className={styles.detail}>{detail}</Text>
        {bottom}
      </View>
    </View>
  );
};

export default Popup;
