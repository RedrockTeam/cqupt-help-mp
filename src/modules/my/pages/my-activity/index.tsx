import React from "react";
import { switchTab } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import PrimaryButton from "@/common/components/primary-button";
import emptyImg from "@/static/images/empty.png";
import { resolvePage } from "@/common/helpers/utils";

import { useQuery } from "react-query/dist/react-query.production.min";
import { getMyActivities } from "../../services/index";
import Activity from "../../components/activity";
import styles from "./index.module.scss";

const activityList = [
  {
    id: 14,
    name: "社团达人天秀",
    team_name: "红岩网校工作站",
    time_done: 1598889600,
    time: "5月16日-5月17日",
    introduction: "介绍",
    location: "地点",
    rule: "规则",
    registration: "",
    myregistration: 1596691976,
    type: 2,
    image: "http://img.zhengyua.cn/test.jpg",
  },
];

const stuNum = 2018211214;
const MyActivity = () => {
  const data = useQuery(["getMyActivities", stuNum], getMyActivities);
  console.log(data);
  // TODO : 等待后端修改接口然后渲染

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
