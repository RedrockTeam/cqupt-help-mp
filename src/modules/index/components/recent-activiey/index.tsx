import React from "react";
import { View, Image, Text } from "@tarojs/components";
import {
  timestampToTimeCNString,
  timestampToDateString,
} from "@/common/helpers/date";
import { navTo } from "@/common/helpers/utils";
import styles from "./index.module.scss";

type Props = {
  remain: number;
  name: string;
  type: 1 | 2;
  url: string;
  org: string;
  startTime: number;
  endTime: number;
  img: string;
};

const RecentActivity = ({
  remain,
  name,
  type,
  url,
  org,
  startTime,
  endTime,
  img,
}: Props) => {
  return (
    <View
      className={styles.activity}
      onClick={() => navTo({ url, title: name })}
    >
      <View className={styles.left}>
        <Image src={img} className={styles.img} />
        <View
          className={`${styles.remainTime} ${remain > 3 ? styles.doing : ""}`}
        >
          {remain > 3 ? "进行中" : `剩余 ${remain} 天`}
        </View>
      </View>
      <View className={styles.right}>
        <View className={styles.activityTitle}>
          {name}
          <View
            className={`${styles.tag} ${
              type === 1 ? styles.online : styles.offline
            }`}
          >
            {type === 1 ? "线上" : "线下"}
          </View>
        </View>
        <Text className={styles.text}>{org}</Text>
        <Text className={styles.text}>
          {timestampToDateString(startTime)} - {timestampToDateString(endTime)}
        </Text>
      </View>
      <View className={styles.right} />
    </View>
  );
};

export default RecentActivity;
