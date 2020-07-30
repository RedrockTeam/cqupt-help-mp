import React from "react";
import { View, Image } from "@tarojs/components";
import avator from "@/static/images/empty.png";
import styles from "./index.module.scss";

const info = [
  {
    id: 0,
    name: "邮小岩",
    title: "摸鱼协会会长",
    time: "2020年10月20日",
    department: "摸鱼协会",
  },
  {
    id: 1,
    name: "邮小岩",
    title: "摸鱼协会会长",
    time: "2020年10月20日",
    department: "摸鱼协会",
  },
];

const IdIndex = () => {
  return (
    <View>
      {info.map((item) => (
        <View key={item.id} className={`${styles.cardWrap} `}>
          <View className={styles.card}>
            <View className={styles.top}>
              <Image src={avator} className={styles.avator} />
              <View className={styles.top_right}>
                <View className={styles.name}>邮小岩</View>
                <View className={styles.info}>摸鱼协会会长</View>
              </View>
            </View>
            <View className={styles.footer}>
              <View className={styles.time}> 2020年10月20日</View>
              <View className={styles.department}>摸鱼协会</View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default IdIndex;
