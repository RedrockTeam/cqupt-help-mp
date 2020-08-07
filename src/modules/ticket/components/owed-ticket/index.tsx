import React from "react";
import { View, Image, Text } from "@tarojs/components";
import styles from "./index.module.scss";

type Props = {
  name: string;
  img: string;
  location: string;
  time: string;
};

const OwedTicket = ({ name, img, location, time }: Props) => {
  return (
    <View className={styles.itemWrapper}>
      <View className={styles.top}>
        <View className={styles.title}>{name}</View>
        <Image src={img} className={styles.img} mode="aspectFill" />
      </View>
      <View className={styles.bottom}>
        <Text className={styles.subtitle}>放映地点</Text>
        <Text className={styles.content}>{location}</Text>
        <Text className={styles.subtitle}>放映时间</Text>
        <Text className={styles.content}>{time}</Text>
      </View>
    </View>
  );
};

export default OwedTicket;
