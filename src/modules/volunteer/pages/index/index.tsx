import React, { useState } from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import { resolvePage, navTo } from "@/common/helpers/utils";
import { now, gapDay } from "@/common/helpers/date";
import { useQuery } from "react-query/dist/react-query.production.min";
import Empty from "@/common/components/empty";
import { navigateBack, redirectTo } from "@tarojs/taro";
import { getVolunteerActivityListInfo, checkIsVolunteer } from "../../services";
import styles from "./index.module.scss";
import VolunteerActivityListInfo from "../../../../mock/VolunteerActivityListInfoRes.json";
const PAGE_TITLE = "志愿报名";

const Volunteer = () => {
  const [active, setActive] = useState<number>(0);
  const { data: isVolunteerRes } = useQuery(
    "checkIsVolunteer",
    checkIsVolunteer,
    {
      cacheTime: 0,
    }
  );
  let { data: list, isLoading, isError } = useQuery(
    "getVolunteerActivityListInfo",
    getVolunteerActivityListInfo
  );

  let xiaojiList;
  let yuanjiList;

  if (list) {
    list = list.data;
    xiaojiList = list.filter((item) => item.team_level === "校级");
    yuanjiList = list.filter((item) => item.team_level === "院级");
    console.log("校级", xiaojiList);
    console.log("院级", yuanjiList);
  }

  // list = VolunteerActivityListInfo;
  if (!isVolunteerRes) {
    return <Placeholder title={PAGE_TITLE} />;
  }
  if (isVolunteerRes.status === 10000) {
    if (!isVolunteerRes.exist) {
      redirectTo({ url: resolvePage("volunteer", "bind") });
    }
  }

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !list) return <Placeholder title={PAGE_TITLE} isError />;
  // if (list.data.length !== 0)
  //   return (
  //     <Empty
  //       title={PAGE_TITLE}
  //       detail="志愿活动空空如也哦～"
  //       suggestion="去看看活动吧"
  //       btnContent="查看活动"
  //       onBtnClick={() => navigateBack()}
  //     />
  //   );
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      <View className={styles.header}>
        <View
          className={`${styles.title} ${active === 0 && styles.active}`}
          onClick={() => setActive(0)}
        >
          校级志愿
        </View>
        <View
          className={`${styles.title} ${active === 1 && styles.active}`}
          onClick={() => setActive(1)}
        >
          院级志愿
        </View>
      </View>
      {/* 校级志愿 */}
      <View style={{ display: active === 0 ? "block" : "none" }}>
        {xiaojiList.length === 0 ? (
          <Empty
            title={PAGE_TITLE}
            detail="志愿活动空空如也哦～"
            suggestion="去看看活动吧"
            btnContent="查看活动"
            onBtnClick={() => navigateBack()}
          />
        ) : (
          xiaojiList
            .sort((a, b) => b.sign_up_last - a.sign_up_last)
            .map((item) => (
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
                      item.sign_up_last < now()
                        ? styles.cardTimeGray
                        : styles.cardTime
                    }
                  >
                    {item.sign_up_last < now()
                      ? "报名已结束"
                      : `距报名结束:${gapDay(item.sign_up_last)}天`}
                  </View>
                </View>
                <View className={styles.cardInfo}>
                  活动简介：
                  {item.description}
                </View>
              </View>
            ))
        )}
      </View>
      {/* 院级志愿 */}
      <View style={{ display: active === 1 ? "block" : "none" }}>
        {yuanjiList.length === 0 ? (
          <Empty
            title={PAGE_TITLE}
            detail="志愿活动空空如也哦～"
            suggestion="去看看活动吧"
            btnContent="查看活动"
            onBtnClick={() => navigateBack()}
          />
        ) : (
          yuanjiList
            .sort((a, b) => b.sign_up_last - a.sign_up_last)
            .map((item) => (
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
                      item.sign_up_last < now()
                        ? styles.cardTimeGray
                        : styles.cardTime
                    }
                  >
                    {item.sign_up_last < now()
                      ? "报名已结束"
                      : `距报名结束:${gapDay(item.sign_up_last)}天`}
                  </View>
                </View>
                <View className={styles.cardInfo}>
                  活动简介：
                  {item.description}
                </View>
              </View>
            ))
        )}
      </View>
    </View>
  );
};

export default Volunteer;
