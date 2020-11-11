import React, { useState } from "react";
import { switchTab, useDidShow } from "@tarojs/taro";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import { resolvePage } from "@/common/helpers/utils";

import { useMutation, useQuery } from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import Empty from "@/common/components/empty";
import { getMyActivities } from "../../services/index";
import Activity from "../../components/activity";
import styles from "./index.module.scss";
import { MyActivities } from "../../services/dto";

const PAGE_TITLE = "我的活动";

const MyActivity = () => {
  const [active, setActive] = useState<number>(0);

  let [activityListRes, setActivityListRes] = useState({})
  let [commonList, setCommonList] = useState<MyActivities>([])
  let [volunteerList, setVolunteerList] = useState<MyActivities>([])
  let [isLoading, setLoading] = useState(true)
  let [isError, setError] = useState(false)

  const [mutateActivityListRes] = useMutation(getMyActivities, {
    onSuccess(activityListRes) {
      setActivityListRes(activityListRes);
      setLoading(false);

      const activityList: MyActivities = activityListRes.data;
      if (activityList) {
        console.log('activityList: ', activityList);

        setCommonList(activityList.filter((activity) => activity.type === 0));
        setVolunteerList(activityList.filter((activity) => activity.type === 1));
        console.log("普通活动", commonList);
        console.log("志愿活动", volunteerList);
        
      } else {
        setCommonList([]);
        setVolunteerList([]);
      }
    },
    onError() {
      setError(true)
    }
  })
  useDidShow(() => {
    mutateActivityListRes();
  })


  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !activityListRes)
    return <Placeholder title={PAGE_TITLE} isError />;



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
                team_name={e.team_name}
                start_date={e.start_date}
                last_date={e.last_date}
                key={e.id}
                registration_time={e.registration_time}
                time_part={e.time_part}
                if_read={e.if_read}
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
                team_name={e.team_name}
                start_date={e.start_date}
                last_date={e.last_date}
                key={e.id}
                registration_time={e.registration_time}
                result={e.result}
                time_part={e.time_part}
                date={e.date}
                if_read={e.if_read}
              />
            )
            ))}
      </View>
    </View>
  );
};

export default MyActivity;
