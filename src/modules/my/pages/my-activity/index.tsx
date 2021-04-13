import React, {useState} from "react";
import {switchTab, useDidShow} from "@tarojs/taro";
import {View} from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import {resolvePage} from "@/common/helpers/utils";

import {useMutation} from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import Empty from "@/common/components/empty";
import {getMyActivities} from "../../services/index";
import Activity from "../../components/activity";
import styles from "./index.module.scss";
import {MyActivities} from "../../services/dto";

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

      // console.log('activityList:', activityList)
      // activityList = [ ...activityList,
      //   {
      //     is_sign: 0,
      //     rely_id: 1,
      //     is_change: 0,
      //     "id": 272,
      //     "type": 1,
      //     "name": "测试我的活动",
      //     "description": "555",
      //     "team_name": "红岩网校工作站—Web研发部",
      //     "sign_up_start": 1605024000,
      //     "sign_up_last": 1605110400,
      //     "last_date": 1705628800,
      //     "start_date": 1605110400,
      //     "date": 1605196800,
      //     "time_part": {
      //       "begin_time": 36000,
      //       "end_time": 43200
      //     },
      //     "if_read": 2,
      //     "result": {
      //       "pass": "0",
      //       "qq": "555"
      //     },
      //     "registration_time": 1605057216
      //   },
      //   {
      //     is_sign: 0,
      //     rely_id: 1,
      //     is_change: 2,
      //     "id": 276,
      //     "type": 1,
      //     "name": "测试我的活动",
      //     "description": "555",
      //     "team_name": "红岩网校工作站—Web研发部",
      //     "sign_up_start": 1605024000,
      //     "sign_up_last": 1605110400,
      //     "last_date": 1705628800,
      //     "start_date": 1605110400,
      //     "date": 1605542400,
      //     "time_part": {
      //       "begin_time": 36000,
      //       "end_time": 43200
      //     },
      //     "if_read": 1,
      //     "result": {
      //       "pass": "1",
      //       "qq": "2222"
      //     },
      //     "registration_time": 1605057225
      //   },
      //   {
      //     is_sign: 0,
      //     rely_id: 1,
      //     is_change: 0,
      //     "id": 274,
      //     "type": 1,
      //     "name": "测试我的活动",
      //     "description": "555",
      //     "team_name": "红岩网校工作站—Web研发部",
      //     "sign_up_start": 1605024000,
      //     "sign_up_last": 1605110400,
      //     "last_date": 1705628800,
      //     "start_date": 1605110400,
      //     "date": 1605369600,
      //     "time_part": {
      //       "begin_time": 36000,
      //       "end_time": 43200
      //     },
      //     "if_read": 3,
      //     "result": {
      //       "pass": "1",
      //       "qq": "8162435"
      //     },
      //     "registration_time": 1605057234
      //   }
      // ]


      if (activityList) {
        console.log("activityList: ", activityList);

        let commonList = activityList.filter((activity) => activity.type === 0)
        commonList.sort((pre, cur) => cur.last_date - pre.last_date)
        setCommonList(commonList);

        let volunteerList = activityList.filter((activity) => activity.type === 1)
        volunteerList.sort((pre, cur) => cur.last_date - pre.last_date)
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
  useDidShow(() => {
    mutateActivityListRes().then();
  });

  if (isLoading) return <Placeholder title={PAGE_TITLE}/>;
  if (isError || !activityListRes)
    return <Placeholder title={PAGE_TITLE} isError/>;

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background={BACKGROUND}/>

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
            onBtnClick={() => switchTab({url: resolvePage("index", "home")})}
            btnContent="查看活动"
          />
        ) : (
          commonList.map((e) => (
            <Activity
              rely_id={e.rely_id}
              is_change={e.is_change}
              is_sign={e.is_sign}
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
          ))
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
            onBtnClick={() => switchTab({url: resolvePage("index", "home")})}
            btnContent="查看活动"
          />
        ) : (
          volunteerList.map((e) => (
            <Activity
              rely_id={e.rely_id}
              is_change={e.is_change}
              is_sign={e.is_sign}
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
          ))
        )}
      </View>
    </View>
  );
};

export default MyActivity;
