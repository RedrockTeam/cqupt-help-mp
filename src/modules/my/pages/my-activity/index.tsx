import React, { useState } from "react";
import { switchTab, useDidShow } from "@tarojs/taro";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import { resolvePage } from "@/common/helpers/utils";

import { useMutation } from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import Empty from "@/common/components/empty";
import { getMyActivities } from "../../services/index";
import Activity from "../../components/activity";
import styles from "./index.module.scss";
import {ConvertingDatesToTimestamps} from "@/common/helpers/date";
import {MyActivities, MyActivitiesRes} from "../../services/dto";
import {postVolunteerActivityRead} from "@/modules/volunteer/services";


const PAGE_TITLE = "我的活动";
const BACKGROUND = "#FFFFFF";

const MyActivity = () => {
  const [active, setActive] = useState<number>(0);

  const [activityListRes, setActivityListRes] = useState({});
  const [commonList, setCommonList] = useState<MyActivities>([]);
  const [volunteerList, setVolunteerList] = useState<MyActivities>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);



  //  获取我的所有活动
  const [mutateActivityListRes] = useMutation(getMyActivities, {
    onSuccess(activityListRes) {
      setActivityListRes(activityListRes);
      setLoading(false);

      let activityList: MyActivities = activityListRes.data;

      if (activityList) {
        console.log("activityList: ", activityList);

        const nowTimeStamp = parseInt(String(new Date().getTime() / 1000));
        let overdueActivity: MyActivities = [];

        let commonList = activityList.filter((activity) => {
          console.log(activity)
          return activity.type === 0
        })
        commonList = commonList.map((cur) => {
          let dates = cur?.time?.split(' - ') as any;
          const startDate = ConvertingDatesToTimestamps(dates[0]);
          const lastDate = ConvertingDatesToTimestamps(dates[1]);
          cur.start_date = startDate;
          cur.last_date = lastDate;
          cur.status = {
            is_change: 0,
            is_sign: 0
          }
          return cur;

        })
        commonList.sort((pre, cur) => cur.last_date - pre.last_date)
        overdueActivity = commonList.filter(cur => cur.last_date < nowTimeStamp);
        commonList = commonList.filter(cur => cur.last_date > nowTimeStamp);
        commonList = commonList.concat(overdueActivity);

        setCommonList(commonList);

        let volunteerList = activityList.filter((activity) => activity.type === 1)
        volunteerList.sort((pre, cur) => cur.last_date - pre.last_date)
        overdueActivity = volunteerList.filter(cur => cur.last_date < nowTimeStamp);
        volunteerList = volunteerList.filter(cur => cur.last_date > nowTimeStamp);
        // @ts-ignore
        volunteerList.sort((cur, next) => cur?.date - next?.date)
        volunteerList = volunteerList.concat(overdueActivity);

        setVolunteerList(volunteerList);

        console.log("普通活动", commonList);
        console.log("志愿活动", volunteerList);
      } else {
        setCommonList([]);
        setVolunteerList([]);
      }
    },
    onError() {
      setError(true);
    },
  });
  //  已读状态管理
  const [mutationPostActivityRead] = useMutation(postVolunteerActivityRead, {})
  useDidShow(() => {
    mutateActivityListRes().then(({ data } : MyActivitiesRes) => {
      const unreadCommonList = data?.filter((activity) => activity.type === 0 && activity.if_read === 1)
      unreadCommonList?.map(commonAc => {
        mutationPostActivityRead({
          registration_time: String(commonAc.registration_time)
        }).then();
      })
    });
  });

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !activityListRes)
    return <Placeholder title={PAGE_TITLE} isError />;

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background={BACKGROUND} />

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
      <View
        style={{
          display:
            active === 0 && commonList.length === 0
              ? "block"
              : active === 0
                ? "flex"
                : "none",
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
          commonList.map((commonActivity) => {
            return (
              <Activity
                key={commonActivity.id}
                activity_detail={commonActivity}
                if_read={commonActivity.if_read}
                registration_time={commonActivity.registration_time} />
            )
          })
        )}
      </View>

      {/* 志愿活动 */}
      <View
        style={{
          display:
            active === 1 && volunteerList.length === 0
              ? "block"
              : active === 1
                ? "flex"
                : "none",
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
          volunteerList.map((volunteerActivity) => {
            console.log(114514)
            console.log(volunteerActivity)
            return (
              <Activity
                key={volunteerActivity.id}
                activity_detail={volunteerActivity}
                if_read={volunteerActivity.if_read}
                registration_time={volunteerActivity.registration_time} />
            )
          })
        )}
      </View>
    </View>
  );
};

export default MyActivity;
