import React, { useState } from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import { resolvePage, navTo } from "@/common/helpers/utils";
import { now, leftTime } from "@/common/helpers/date";
import { useQuery } from "react-query/dist/react-query.production.min";
import Empty from "@/common/components/empty";
import { navigateBack, redirectTo } from "@tarojs/taro";
import { getVolunteerActivityListInfo, checkIsVolunteer } from "../../services";
import styles from "./index.module.scss";
// import VolunteerActivityListInfoRes from "../../../../mock/VolunteerActivityListInfoRes.json";
import SwitchHeader from "@/common/components/switchHeader";
import { VolunteerActivity } from "../../services/dto";

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
  // list = VolunteerActivityListInfoRes;
  let xiaojiList: VolunteerActivity[] = [];
  let yuanjiList: VolunteerActivity[] = [];

  if (list?.data) {
    xiaojiList = list.data.filter((item) => item.team_level === "校级");
    yuanjiList = list.data.filter((item) => item.team_level === "院级");
  }

  // list = VolunteerActivityListInfo;
  if (!isVolunteerRes) {
    return <Placeholder title={PAGE_TITLE} />;
  }
  if (isVolunteerRes.status === 10000) {
    if (!isVolunteerRes.data) {
      redirectTo({ url: resolvePage("volunteer", "bind") });
    }
  }

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !list) return <Placeholder title={PAGE_TITLE} isError />;
  const activitySignUpStatus = (start, last) => {
    const nowTimeStamp = now();
    if (start > nowTimeStamp) {
      return `距报名开始${leftTime(start)}`;
    } else if (start < nowTimeStamp && nowTimeStamp < last) {
      return "正在报名ing";
    } else {
      return "报名已截止";
    }
  };

  const renderList = (list: VolunteerActivity[]) => {
    console.log(list)
    return (
      <View>
        {list.length === 0 ? (
          <Empty
            style={{
              padding: "0px",
            }}
            title={PAGE_TITLE}
            detail="志愿活动空空如也哦～"
            suggestion="去看看活动吧"
            btnContent="查看活动"
            onBtnClick={() => navigateBack()}
          />
        ) : (
          list
            .sort((a, b) => b.sign_up_start - a.sign_up_start)
            .map((item: VolunteerActivity) => (
              <View
                className={styles.card}
                key={item.activity_id}
                onClick={() =>
                  navTo({
                    url: `${resolvePage("volunteer", "detail")}?rely_id=${
                      item.activity_id
                    }`,
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
                    {activitySignUpStatus(
                      item.sign_up_start,
                      item.sign_up_last
                    )}
                  </View>
                </View>
                <View className={styles.cardInfo}>
                  活动简介：
                  {item.introduction}
                </View>
              </View>
            ))
        )}
      </View>
    );
  };
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#FFFFFF" />
      <SwitchHeader
        active={active}
        setActive={setActive}
        titles={["校级志愿", "院级志愿"]}
      />
      {active === 0 ? renderList(xiaojiList) : renderList(yuanjiList)}
    </View>
  );
};

export default Volunteer;
