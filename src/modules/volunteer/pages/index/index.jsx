import React from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import { resolvePage, navTo } from "@/common/helpers/utils";
import styles from "./index.module.scss";

const list = [
  {
    name: "护花使者",
    time: "距离活动结束：10天",
    key: 0,
    info:
      "活动简介:志愿者需要在选择的志愿时间内，在指定地点进行护花活动，对进行随意摘花的同学、游客进行提醒，并告诫摘花的坏处等。",
  },
  {
    name: "护花使者",
    time: "已结束",
    key: 1,
    info: "志愿者需要在选择的志愿时间内，在指定地点进行护花活动，对",
  },
];

const Volunteer = () => (
  <View className={styles.wrapper}>
    <NavBack title="志愿报名" background="#F6F6F9" />
    {list.map((item) => (
      <View
        className={styles.card}
        key={item.key}
        onClick={() => navTo({ url: resolvePage("volunteer", "detail") })}
      >
        <View className={styles.cardTop}>
          <View className={styles.cardName}>{item.name}</View>
          <View
            className={
              item.time === "已结束" ? styles.cardTimeGray : styles.cardTime
            }
          >
            {item.time}
          </View>
        </View>
        <View className={styles.cardInfo}>
          活动简介：
          {item.info}
        </View>
      </View>
    ))}
  </View>
);

export default Volunteer;
