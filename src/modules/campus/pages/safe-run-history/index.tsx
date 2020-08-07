import React from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import { useQuery } from "react-query/dist/react-query.production.min";
import { getHistory } from "../../services";
import styles from "./index.module.scss";
import RunHistory from "../../components/run-history";

// const list = [
//   {
//     num: "B97",
//     place: "风华操场一号店",
//     time: "2020-06-07",
//     hasTaken: true,
//   },
//   {
//     num: "B98",
//     place: "风华操场一号店",
//     time: "2020-06-07",
//     hasTaken: false,
//   },
//   {
//     num: "B99",
//     place: "风华操场一号店",
//     time: "2020-06-07",
//     hasTaken: true,
//   },
//   {
//     num: "B100",
//     place: "风华操场一号店",
//     time: "2020-06-07",
//     hasTaken: true,
//   },
//   {
//     num: "B101",
//     place: "风华操场一号店",
//     time: "2020-06-07",
//     hasTaken: true,
//   },
//   {
//     num: "B102",
//     place: "风华操场一号店",
//     time: "2020-06-07",
//     hasTaken: true,
//   },
// ];

const SafeRunHistory = () => {
  const { data } = useQuery(["getRecords", { page: 1 }], getHistory);
  const list = data?.records;

  return (
    <View className={styles.wrapper}>
      <NavBack title="取包记录" background="#F6F6F9" />
      {list?.length ? list.map((e) => <RunHistory key={e.ID} {...e} />) : null}
    </View>
  );
};

export default SafeRunHistory;
