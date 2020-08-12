import React from "react";
import { View, Image, Text } from "@tarojs/components";
import { gapDay } from "@/common/helpers/date";
import { navTo, resolvePage } from "@/common/helpers/utils";
import styles from "./index.module.scss";

type Props = {
  name: string;
  teamName: string;
  timeDone: number;
  time: string;
  introduction: string;
  location: string;
  rule: string;
  registration: string;
  type: 1 | 2;
  image: string;
};

const RecentActivity = ({
  name,
  teamName,
  timeDone,
  time,
  introduction,
  location,
  rule,
  registration,
  type,
  image,
}: Props) => {
  if (gapDay(timeDone) < 0) {
    return null;
  }
  return (
    <View
      className={styles.activity}
      onClick={() => {
        if (type === 1 /* 线上活动 */) {
          navTo({ url: registration, payload: { title: name } });
        } else {
          // 线下活动
          navTo({
            url: resolvePage("index", "activity-detail"),
            payload: {
              name,
              time,
              location,
              introduction,
              rule,
              image,
              registration,
            },
          });
        }
      }}
    >
      <View className={styles.left}>
        <Image src={image} className={styles.img} mode="aspectFill" />
        <View
          className={`${styles.remainTime} ${
            gapDay(timeDone) > 3 ? styles.doing : ""
          }`}
        >
          {gapDay(timeDone) > 3 ? "进行中" : `剩余 ${gapDay(timeDone)} 天`}
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
        <Text className={styles.text}>{teamName}</Text>
        <Text className={styles.text}>
          {/* {timestampToDateString(startTime)} - {timestampToDateString(endTime)} */}
          {time}
        </Text>
      </View>
      <View className={styles.right} />
    </View>
  );
};

export default RecentActivity;
