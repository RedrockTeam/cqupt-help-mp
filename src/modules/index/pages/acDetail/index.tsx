import React, { useState } from "react";
import { View, Image, Text, Button } from "@tarojs/components";
import { redirectTo, useRouter } from "@tarojs/taro";
import { resolvePage } from "@/common/helpers/utils";
import { timestampToDateString } from "@/common/helpers/date";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import NavBack from "@/common/components/nav-back";
import icon1 from "@/static/images/volunteer-icon1.png";
import icon2 from "@/static/images/volunteer-icon2.png";
import icon3 from "@/static/images/volunteer-icon3.png";

import styles from "./index.module.scss";

const AcDetail = () => {
  const { params } = useRouter();

  const Popup = useContainer(PopupContext);

  const data = {
    data: {
      name: "采花使者",
      description: "caicai",
      role: "cacaiicaic",
      date: 1589426996,
      hour: "10h",
      last_date: 1599426996,
    },
  };

  return (
    <View>
      {data ? (
        <View className={styles.wrapper}>
          <NavBack title="志愿报名" background="#F6F6F9" />
          <View className={styles.pic}>一张图片</View>
          <View className={styles.card}>
            <View className={styles.item1}>
              <View className={styles.title}>
                <View className={styles.name}>{data.data.name}</View>
                <View className={styles.status}>招募中</View>
              </View>
              <View className={styles.timeWrap}>
                <View>报名截止时间:</View>
                <View className={styles.time}>
                  {timestampToDateString(data.data.last_date)}
                </View>
              </View>
              <View className={styles.timeWrap}>
                <View>志愿服务时间:</View>
                <View className={styles.time}>
                  {timestampToDateString(data.data.date)}
                </View>
              </View>
            </View>

            <View className={styles.item2}>
              <View className={styles.subTitle}>
                <Image src={icon1} className={styles.icon} />
                <Text>活动介绍</Text>
              </View>
              <View className={styles.text}>{data.data.description}</View>
            </View>
            <View className={styles.item2}>
              <View className={styles.subTitle}>
                <Image src={icon2} className={styles.icon} />
                <Text>活动规则</Text>
              </View>
              <View className={styles.text}>{data.data.role}</View>
            </View>
            <View className={styles.item2}>
              <View className={styles.subTitle}>
                <Image src={icon3} className={styles.icon} />
                <Text>活动时长</Text>
              </View>
              <View className={styles.text}>{data.data.hour}</View>
            </View>
          </View>
          <View />
          <Button className={styles.button}>立即报名</Button>

          <Popup.Comp />
        </View>
      ) : null}
    </View>
  );
};

export default AcDetail;
