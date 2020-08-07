import React from "react";
import { switchTab } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import PrimaryButton from "@/common/components/primary-button";
import emptyImg from "@/static/images/empty.png";
import { resolvePage } from "@/common/helpers/utils";

import { useQuery } from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import { getMyActivities } from "../../services/index";
import Activity from "../../components/activity";
import styles from "./index.module.scss";

const MyActivity = () => {
  const { data: activityListRes, isLoading, isError } = useQuery(
    ["getMyActivities"],
    getMyActivities
  );

  if (isLoading) return <Placeholder title="我的活动" />;
  if (isError) return <Placeholder title="我的活动" isError />;

  const handleNavigateToActivity = () =>
    switchTab({ url: resolvePage("index", "home") });

  const hasActivities = activityListRes?.data.length !== 0;

  const renderActivityList = () => (
    <View className={styles.wrapper}>
      <NavBack title="我的活动" background="#F6F6F9" />
      {hasActivities &&
        activityListRes?.data.map((e) => (
          <Activity
            name={e.name}
            teamName={e.team_name}
            timeDone={e.time_done}
            time={e.time}
            myregistration={e.myregistration}
            key={e.id}
          />
        ))}
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
