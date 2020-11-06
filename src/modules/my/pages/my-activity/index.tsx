import React, { useState } from "react";
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
import { MyActivities } from "../../services/dto";

const PAGE_TITLE = "我的活动";

const MyActivity = () => {
  const [active, setActive] = useState<number>(0);

  let { data: activityListRes, isLoading, isError } = useQuery(
    ["getMyActivities"],
    getMyActivities
  );

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !activityListRes)
    return <Placeholder title={PAGE_TITLE} isError />;


  let commonList: MyActivities
  let volunteerList: MyActivities

  console.log('activityListRes: ', activityListRes);

  const activityList: MyActivities = activityListRes.data;
  if (activityList) {
    console.log('activityList: ', activityList);

    commonList = activityList.filter((activity) => activity.type === 0);
    volunteerList = activityList.filter((activity) => activity.type === 1);
    console.log("普通活动", commonList);
    console.log("志愿活动", volunteerList);
  } else {
    commonList = [];
    volunteerList = []
  }


  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#FFFFFF" />

      <View className={styles.header}>
        <View
          className={`${styles.title} ${active === 0 && styles.active}`}
          onClick={() => setActive(0)}
        >
          普通活动
        </View>
        <View
          className={`${styles.title} ${active === 1 && styles.active}`}
          onClick={() => setActive(1)}
        >
          志愿活动
        </View>
      </View>

      {/* 普通活动 */}
      <View style={{
          display: active === 0 && commonList.length === 0 ? 'block' :
            active === 0 ? 'flex' : 'none'
        }}
        className={styles.container}
      >
        {commonList.length === 0 ? (
          <Empty
            title={PAGE_TITLE}
            detail="活动空空如也哦～"
            suggestion="快去参加活动领取奖品吧"
            onBtnClick={() => switchTab({ url: resolvePage("index", "home") })}
            btnContent="查看活动"
          />
        ) : (
            commonList.map((e) => (
              <Activity
                id={e.id}
                type={e.type}
                name={e.name}
                teamName={e.team_name}
                start_date={e.start_date}
                last_date={e.last_date}
                key={e.id}
                myregistration={e.myregistration}
              />
            )
            ))}
      </View>

      {/* 志愿活动 */}
      <View style={{
          display: active === 1 && volunteerList.length === 0 ? 'block' :
            active === 1 ? 'flex' : 'none'
        }}
        className={styles.container}
      >
        {volunteerList.length === 0 ? (
          <Empty
            title={PAGE_TITLE}
            detail="活动空空如也哦～"
            suggestion="快去参加活动领取奖品吧"
            onBtnClick={() => switchTab({ url: resolvePage("index", "home") })}
            btnContent="查看活动"
          />
        ) : (
            volunteerList.map((e) => (
              <Activity
                id={e.id}
                type={e.type}
                name={e.name}
                teamName={e.team_name}
                start_date={e.start_date}
                last_date={e.last_date}
                key={e.id}
                myregistration={e.myregistration}
              />
            )
            ))}
      </View>

      {/* {activityListRes.data.map((e) => (
        <Activity
          name={e.name}
          teamName={e.team_name}
          timeDone={e.time_done}
          time={e.time}
          myregistration={e.myregistration}
          key={e.id}
        />
      ))} */}
    </View>
  );
};

export default MyActivity;
