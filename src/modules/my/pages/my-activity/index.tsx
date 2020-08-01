import React from "react";
import { switchTab } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import PrimaryButton from "@/common/components/primary-button";
import emptyImg from "@/static/images/empty.png";
import { resolvePage } from "@/common/helpers/utils";
import Activity from "../../components/activity";
import styles from "./index.module.scss";

const activityList = [
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1665360000,
  //   name: '啦啦队大比拼1',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1665360000,
  //   name: '啦啦队大比拼2',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1665360000,
  //   name: '啦啦队大比拼3',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1665360000,
  //   name: '啦啦队大比拼4',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1587484800,
  //   name: '啦啦队大比拼5',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1587484800,
  //   name: '啦啦队大比拼6',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1587484800,
  //   name: '啦啦队大比拼7',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1665360000,
  //   name: '啦啦队大比拼8',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1665360000,
  //   name: '啦啦队大比拼9',
  //   organizer: '红岩网校',
  // },
  // {
  //   time: 1637484800,
  //   beginTime: 1587484800,
  //   endTime: 1665360000,
  //   name: '啦啦队大比拼10',
  //   organizer: '红岩网校',
  // },
];

const MyActivity = () => {
  const handleNavigateToActivity = () =>
    switchTab({ url: resolvePage("index", "home") });
  const hasActivities = activityList.length !== 0;
  const renderActivityList = () => (
    <View className={styles.wrapper}>
      <NavBack title="我的活动" background="#F6F6F9" />
      {activityList.length &&
        activityList.map((e) => <Activity {...e} key={e.name} />)}
    </View>
  );
  const renderEmpty = () => (
    <View className={styles.emptyWrapper}>
      <NavBack title="我的活动" background="#FFFFFF" />
      <Image src={emptyImg} className={styles.img} />
      <Text className={styles.text}>活动空空如也哦~</Text>
      <Text className={styles.text}>快去参加活动领取奖品吧</Text>
      <PrimaryButton className={styles.btn} onClick={handleNavigateToActivity}>
        查看活动
      </PrimaryButton>
    </View>
  );
  return hasActivities ? renderActivityList() : renderEmpty();
};

export default MyActivity;
