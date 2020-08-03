import React from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Loading from "@/common/components/loading";
import { resolvePage, navTo } from "@/common/helpers/utils";
import { useQuery } from "react-query/dist/react-query.production.min";
import { getVolunteerActivityListInfo } from "../../services";
import styles from "./index.module.scss";

const Volunteer = () => {
  const { data: list } = useQuery(
    "getVolunteerActivityListInfo",
    getVolunteerActivityListInfo
  );
  if (!list) {
    return <Loading />;
  }
  if (list.status !== 10000) {
    return "Error"; // error
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
                item.left === "已结束" ? styles.cardTimeGray : styles.cardTime
              }
            >
              {item.left}
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
