import Empty from "@/common/components/empty";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import SwitchHeader from "@/common/components/switchHeader";
import { timestampToDateString } from "@/common/helpers/date";
import { navTo, resolvePage } from "@/common/helpers/utils";
import { Button, View } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query/dist/react-query.production.min";
// TODO: mock数据，发布时注释
// import { getIdCardRes } from "../../mock/getIdCardRes";
import { getIdCardList } from "../../services";
import styles from "./index.module.scss";
const PAGE_TITLE = "身份有证";

const IdIndex = () => {
  const [active, setActive] = useState(0);
  let { data: idCardListRes, isLoading, isError } = useQuery(
    "getIdCardList",
    getIdCardList
  );

  const types = ["组织", "社团"];
  // TODO: mock数据，发布时注释
  // idCardListRes = getIdCardRes;

  // FIXME: 一个由于后端传的数据问题，做的很傻逼的数据转换，建议干掉后端
  useEffect(() => {
    if (idCardListRes) {
      idCardListRes.data = idCardListRes.data.map((e) => {
        if (e.team_id === 10) {
          e.team_level = "社团";
          e.team_name = e.role.split(" ")[0];
          e.role = e.role.split(" ")[1];
        }
        e.start_time = timestampToDateString(e.start_time as number);
        e.end_time = timestampToDateString(e.end_time as number);
        return e;
      });
    }
  }, [idCardListRes]);

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !idCardListRes)
    return <Placeholder title={PAGE_TITLE} isError />;

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#FFFFFF" />
      <SwitchHeader active={active} setActive={setActive} titles={types} />
      <View>
        {idCardListRes.data.length === 0 ? (
          <Empty
            style={{
              padding: "0px",
            }}
            title={PAGE_TITLE}
            detail="证件空空如也哦～"
            suggestion="快去申请新的会员证吧"
            btnContent=""
          />
        ) : (
          idCardListRes.data
            ?.filter((e) => e.team_level === types[active])
            .map((item) => (
              <View
                className={styles.card}
                key={item.team_id + item.team_name}
                style={{
                  backgroundImage: `url(${
                    require(`@/static/images/id/card-${
                      item.team_level === "组织"
                        ? item.team_name
                        : "学生社团联合部"
                    }.png`).default
                  })`,
                }}
              >
                <View className={styles.top}>
                  <View className={styles.teamName}>{item.team_name}</View>
                </View>
                <View className={styles.footer}>
                  <View className={styles.title}>{item.role}</View>
                  <View className={styles.time}>
                    {item.start_time} - {item.end_time}
                  </View>
                </View>
              </View>
            ))
        )}
      </View>
      <Button
        className={styles.btn}
        onClick={() =>
          navTo({ url: `${resolvePage("id", "apply")}?type=${types[active]}` })
        }
      >
        申请新证
      </Button>
    </View>
  );
};

export default IdIndex;
