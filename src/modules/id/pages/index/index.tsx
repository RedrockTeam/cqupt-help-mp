import Empty from "@/common/components/empty";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import SwitchHeader from "@/common/components/switchHeader";
import { navTo, resolvePage } from "@/common/helpers/utils";
import { Button, View } from "@tarojs/components";
import React, { useState } from "react";
import { useQuery } from "react-query/dist/react-query.production.min";
// TODO: mock数据，发布时注释
import { getIdCardRes } from "../../mock/getIdCardRes";
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
  idCardListRes = getIdCardRes;

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
            ?.filter((e) => e.type === types[active])
            .map((item) => (
              <View className={styles.card} key={item.team_name + item.title}>
                <View className={styles.top}>
                  <View className={styles.teamName}>{item.team_name}</View>
                </View>
                <View className={styles.footer}>
                  <View className={styles.title}>{item.title}</View>
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
        onClick={() => navTo({ url: resolvePage("id", "apply") })}
      >
        申请新证
      </Button>
    </View>
  );
};

export default IdIndex;
