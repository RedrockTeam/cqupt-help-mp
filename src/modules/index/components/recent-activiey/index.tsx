import React from "react";
import { View, Image, Text } from "@tarojs/components";
// import { timestampToDateString } from "@/common/helpers/date";
import { navTo } from "@/common/helpers/utils";
import styles from "./index.module.scss";

type Props = {
  id: number;
  name: string;
  team_name: string;
  time_done: number;
  time: string;
  introduction: string;
  location: string;
  rule: string;
  registration: string;
  type: 1 | 2;
  image: string;
};

// TODO : 时间的处理
const RecentActivity = ({
  name,
  team_name: teamName,
  time_done: timeDone,
  time,
  location,
  type,
  image,
}: Props) => {
  return (
    <View
      className={styles.activity}
      onClick={() => navTo({ url: location, title: name })}
    >
      <View className={styles.left}>
        <Image src={image} className={styles.img} />
        <View
          className={`${styles.remainTime} ${timeDone > 3 ? styles.doing : ""}`}
        >
          {timeDone > 3 ? "进行中" : `剩余 ${timeDone} 天`}
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
