import React from "react";
import { View, Image, Text } from "@tarojs/components";
import { gapDay } from "@/common/helpers/date";
import { getString, navTo, resolvePage } from "@/common/helpers/utils";

import styles from "./index.module.scss";
import volunteerImg from "@/static/images/volunteer-img.jpg";


function getDateString(timeStamp: number) {
  const date = new Date(timeStamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

type Props = {
  name: string;
  teamName: string;
  signUpStart: number;
  signUpEnd: number;
  introduction: string;
  id: number;
};

const RecentActivity = ({
  name,
  teamName,
  signUpStart,
  signUpEnd,
  introduction,
  id
}: Props) => {
  if (gapDay(signUpEnd) < 0) {
    return null;
  }
  return (
    <View
      className={styles.activity}
      onClick={() => {
        console.log("触发线下活动");
        navTo({
          url: resolvePage("index", "activity-detail"),
          payload: {
            name,
            introduction,
            id
          },
          encode: true,
        });
      }}
    >
      <View className={styles.left}>
        <Image src={volunteerImg} className={styles.img} mode="aspectFill" />
        <View
          className={`${styles.remainTime} ${gapDay(signUpEnd) > 3 ? styles.doing : ""
            }`}
        >
          {gapDay(signUpEnd) > 3 ? "进行中" : `剩余 ${gapDay(signUpEnd)} 天`}
        </View>
      </View>
      <View className={styles.right}>
        <Text className={styles.activityTitle}>{name}</Text>
        <Text className={styles.text}>{getString(teamName)}</Text>
        <Text className={styles.text}>{
          `${getDateString(signUpStart * 1000)} - ${getDateString(signUpEnd * 1000)}`
        }</Text>
      </View>
    </View>
  );
};

export default RecentActivity;
