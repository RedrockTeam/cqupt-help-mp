import React from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import { useQuery } from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import Empty from "@/common/components/empty";
import { navigateBack } from "@tarojs/taro";
import dayjs from "dayjs";
import { getHistory } from "../../services";
import styles from "./index.module.scss";
import RunHistory from "../../components/run-history";

const PAGE_TITLE = "取包记录";

const SafeRunHistory = () => {
  const { data: historyListRes, isLoading, isError } = useQuery(
    ["getRecords", { page: 1 }],
    getHistory
  );

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !historyListRes)
    return <Placeholder title={PAGE_TITLE} isError />;
  if (historyListRes.records.length === 0)
    return (
      <Empty
        title={PAGE_TITLE}
        detail="您还没有存过包～"
        suggestion="去存包跑步吧"
        btnContent="天天护跑"
        onBtnClick={() => navigateBack()}
      />
    );

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      {historyListRes.records.map((e) => (
        <RunHistory
          key={e.save_time}
          num={e.id}
          takeTime={dayjs(e.take_time).unix()}
          location={e.location}
        />
      ))}
    </View>
  );
};

export default SafeRunHistory;
