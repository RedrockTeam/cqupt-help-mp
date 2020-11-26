import React from "react";
import { View, Image, Text } from "@tarojs/components";
import PrimaryButton from "@/common/components/primary-button";
import { timestampToTimeCNString, now } from "@/common/helpers/date";
import dateIcon from "@/static/images/date.png";
import styles from "./index.module.scss";

/**
 * playTime：放映时间
 * robTime：抢票时间
 * location：放映地点
 * remain：剩余票数
 * image：电影封面 url
 * name：电影名
 */
type Props = {
  id: number;
  playTime: number;
  robTime: number;
  location: string;
  remain: number;
  image: string;
  name: string;
  isReceived: boolean;
  onRobTicket: (id: number) => void;
};

const Ticket = ({
  id,
  playTime,
  robTime,
  location,
  remain,
  image,
  name,
  isReceived,
  onRobTicket,
}: Props) => {
  const renderRobBtn = () => {
    const nowTimestamp = now();
    if (isReceived)
      return (
        <PrimaryButton disabled className={styles.btn}>
          已领取
        </PrimaryButton>
      );

    if (nowTimestamp >= robTime && playTime >= nowTimestamp) {
      if (remain <= 0)
        return (
          <PrimaryButton disabled className={styles.btn}>
            已抢完
          </PrimaryButton>
        );
      return (
        <PrimaryButton className={styles.btn} onClick={() => onRobTicket(id)}>
          立即抢票
        </PrimaryButton>
      );
    }
    if (nowTimestamp > playTime) {
      return (
        <PrimaryButton disabled className={styles.btn}>
          已失效
        </PrimaryButton>
      );
    }
    if (robTime > nowTimestamp) {
      const leftTime = Math.ceil((robTime - nowTimestamp) / 60);
      if (leftTime < 120) {
        return (
          <PrimaryButton disabled className={styles.btn}>
            距离抢票还有 {leftTime} min
          </PrimaryButton>
        );
      }
      return (
        <PrimaryButton disabled className={styles.btn}>
          等待开抢
        </PrimaryButton>
      );
    }
  };

  return (
    <View className={styles.wrapper}>
      <View className={styles.date}>
        <Image src={dateIcon} className={styles.dateImg} />
        <Text className={styles.robTime}>
          {timestampToTimeCNString(robTime)}
        </Text>
      </View>
      <View className={styles.content}>
        <Image src={image} className={styles.img} />
        <View className={styles.info}>
          <View className={styles.header}>
            <Text>{name}</Text>
            <Text className={styles.remain}>剩余 {remain} 张</Text>
          </View>
          <Text className={styles.text}>
            活动时间：{timestampToTimeCNString(playTime)}
          </Text>
          <Text className={styles.text}>活动地点：{location}</Text>
          {renderRobBtn()}
        </View>
      </View>
    </View>
  );
};

export default Ticket;
