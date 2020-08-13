import React, { useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { scanCode } from "@tarojs/taro";
import NavBack from "@/common/components/nav-back";
import PrimaryButton from "@/common/components/primary-button";
import {
  useQuery,
  useMutation,
  useQueryCache,
} from "react-query/dist/react-query.production.min";
import { resolvePage, navTo } from "@/common/helpers/utils";
import { isOpen } from "@/common/helpers/date";
import waitImg from "@/static/images/wait.png";
import Placeholder from "@/common/components/placeholder";
import dayjs from "dayjs";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import { getScan, getStatus } from "../../services/index";

import styles from "./index.module.scss";
import SafeRunAway from "../safe-run-away";

const SafeRun = () => {
  const Popup = useContainer(PopupContext);
  const queryCache = useQueryCache();

  useEffect(() => {
    let hide: undefined | (() => void);
    if (!isOpen()) {
      hide = Popup.show({
        detail: "请在20点到22点之间使用该功能~",
        img: waitImg,
      });
    }
    return () => {
      if (hide) hide();
    };
  }, [Popup]);

  const [mutateScan] = useMutation(getScan, {
    onSuccess: (res) => {
      if (res.status === 10000) {
        if (res.plate_num.includes("-1")) {
          const hide = Popup.show({
            detail: "号码牌已发完,请耐心等待！",
            img: waitImg,
          });
          setTimeout(() => hide(), 1500);
        } else {
          queryCache.invalidateQueries("getStatus");
        }
      }
    },
  });

  const { data, isLoading, isError } = useQuery("getStatus", getStatus);

  const goToHistroy = () => {
    navTo({
      url: resolvePage("campus", "safe-run-history"),
    });
  };

  const scan = async () => {
    scanCode({
      async success({ result }) {
        await mutateScan(result);
      },
    });
  };

  if (isLoading) return <Placeholder title="天天护跑" />;
  if (isError || !data) return <Placeholder title="天天护跑" isError />;

  if (data.number !== 0) {
    return (
      <SafeRunAway
        number={data.number}
        plate={data.plate}
        saveTime={dayjs(data.save_time).unix()}
      />
    );
  }

  return (
    <View className={styles.wrapper}>
      <NavBack title="天天护跑" background="#F6F6F9" />
      <View className={styles.history} onClick={goToHistroy}>
        取包记录
      </View>
      <View className={styles.scanWrapper}>
        <View className={styles.scan} />
        <PrimaryButton className={styles.btn} onClick={scan}>
          扫一扫
        </PrimaryButton>
        <Text className={styles.text}>扫一扫，快速取号码牌</Text>
      </View>
      <View className={styles.bottom}>
        <Text className={styles.title}>存包规则</Text>
        <Text className={styles.text}>1. 贵重物品还请自行妥善保管。</Text>
        <Text className={styles.text}>
          2. 护跑时间从晚上<Text className={styles.strong}>8点到10点</Text>
          ，请在<Text className={styles.strong}>9:45</Text>
          之前，根据自身情况来将存包拿。
        </Text>
        <Text className={styles.text}>
          3.我们将在<Text className={styles.strong}>22:10</Text>
          之前离开护跑点，每个点会留一位志愿者看管未取走的包裹直到晚上10点15，若逾期仍未取消，并出现包丢失的情况，青协将不承担任何责任，望大家理解。
        </Text>
      </View>
      <Popup.Comp />
    </View>
  );
};

export default SafeRun;
