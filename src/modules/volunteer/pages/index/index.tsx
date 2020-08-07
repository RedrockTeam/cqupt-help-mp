import React from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import { resolvePage, navTo } from "@/common/helpers/utils";
import { gapDay } from "@/common/helpers/date";
import { useQuery } from "react-query/dist/react-query.production.min";
import { getVolunteerActivityListInfo } from "../../services";
import styles from "./index.module.scss";

const Volunteer = () => {
  const { data: list } = useQuery(
    "getVolunteerActivityListInfo",
    getVolunteerActivityListInfo
  );
  if (!list) {
    return <Placeholder title="志愿报名" />;
  }
  if (list.status !== 10000) {
    return <Placeholder title="志愿报名" isError />;
  }
  return (
    <View className={styles.wrapper}>
      <NavBack title="志愿报名" background="#F6F6F9" />
      {list.data.map((item) => (
        <View
          className={styles.card}
          key={item.id}
          onClick={() =>
            navTo({
              url: `${resolvePage("volunteer", "detail")}?id=${item.id}`,
            })
          }
        >
          <View className={styles.cardTop}>
            <View className={styles.cardName}>{item.name}</View>
            <View
              className={
                gapDay(item.last_date) <= 0
                  ? styles.cardTimeGray
                  : styles.cardTime
              }
            >
              {gapDay(item.last_date) <= 0
                ? "已结束"
                : `距报名结束:${gapDay(item.last_date)}天`}
            </View>
          </View>
          <View className={styles.cardInfo}>
            活动简介：
            {item.description}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Volunteer;
