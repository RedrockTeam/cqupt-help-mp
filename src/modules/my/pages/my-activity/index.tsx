import React from "react";
import { switchTab } from "@tarojs/taro";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import { resolvePage } from "@/common/helpers/utils";

import { useQuery } from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import Empty from "@/common/components/empty";
import { getMyActivities } from "../../services/index";
import Activity from "../../components/activity";
import styles from "./index.module.scss";

const PAGE_TITLE = "我的活动";

const MyActivity = () => {
  const { data: activityListRes, isLoading, isError } = useQuery(
    ["getMyActivities"],
    getMyActivities
  );

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !activityListRes)
    return <Placeholder title={PAGE_TITLE} isError />;
  if (activityListRes.data.length === 0)
    return (
      <Empty
        title={PAGE_TITLE}
        detail="活动空空如也哦～"
        suggestion="快去参加活动领取奖品吧"
        onBtnClick={() => switchTab({ url: resolvePage("index", "home") })}
        btnContent="查看活动"
      />
    );
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      {activityListRes.data.map((e) => (
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
};

export default MyActivity;
