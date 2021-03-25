import React from "react";
import { Params } from "@/modules/volunteer/pages/application";
import {useRouter} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import styles from "@/modules/volunteer/pages/change-time/index.module.scss";
import NavBack from "@/common/components/nav-back";


const PAGE_TITLE = '修改班次'

const VolunteerChangeTime = () => {
  const { name, team_name, start_date, last_date } = useRouter().params as Params;



  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9"/>

      <View className={styles.volunteer}>
        <View className={styles.header}>
          <Text>{name}</Text>
        </View>
        <Text className={styles.info}>活动组织：{team_name}</Text>
        <Text className={styles.info}>
          活动时间：{start_date}-{last_date}
        </Text>
      </View>

    </View>
  )
}

export default VolunteerChangeTime;
