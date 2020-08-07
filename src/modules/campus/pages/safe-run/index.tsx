import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import Taro, { redirectTo } from "@tarojs/taro";
import NavBack from "@/common/components/nav-back";
import PrimaryButton from "@/common/components/primary-button";
import { useQuery } from "react-query/dist/react-query.production.min";
import { useMutation } from "react-query";
import { resolvePage, navTo } from "@/common/helpers/utils";
import { isOpen } from "@/common/helpers/date";
import Popup from "@/common/components/popup";
import waitImg from "@/static/images/wait.png";
import Loading from "@/common/components/loading";
import { getScan, getStatus } from "../../services/index";

import styles from "./index.module.scss";
import SafeRunAway from "../safe-run-away";

const SafeRun = () => {
  const [fullShow, setFullShow] = useState(false); // 号码牌是否用完
  const [timeShow, setTimeShow] = useState(false); // 是否到可取时间

  // useEffect(() => {
  //   if (!isOpen()) {
  //     setTimeShow(true);
  //   }
  // }, []);

  const [mutateScan] = useMutation(getScan, {
    onSuccess: (res) => {
      if (res.status === 1000) {
        if (res.plate_num.indexOf("-1")) {
          setFullShow(true);
        } else {
          redirectTo({
            url: resolvePage("campus", "safe-run"),
          });
        }
      }
    },
  });

  const { data } = useQuery("getStatus", getStatus);

  const goToHistroy = () => {
    navTo({
      url: resolvePage("campus", "safe-run-history"),
    });
  };

  const Scan = async () => {
    Taro.scanCode({
      success({ result }) {
        const res = mutateScan(result);
      },
    });
  };

  if (!data) {
    return <Loading />;
  }

  if (data.number !== 0) {
    return <SafeRunAway {...data} />;
  }

  return (
    <View className={styles.wrapper}>
      <NavBack title="天天护跑" background="#F6F6F9" />
      <View className={styles.history} onClick={goToHistroy}>
        取包记录
      </View>
      <View className={styles.scanWrapper}>
        <View className={styles.scan} />
        <PrimaryButton className={styles.btn} onClick={Scan}>
          扫一扫
        </PrimaryButton>
        <Text className={styles.text}>扫一扫，快速取号码牌</Text>
      </View>
      <View className={styles.bottom}>
        <Text className={styles.title}>存包规则</Text>
        <Text className={styles.text}>1. 贵重物品还请自行妥善保。</Text>
        <Text className={styles.text}>
          2. 护跑时间从晚上8点到10点，请在9:45之前，根据自身情况来将存包拿。
        </Text>
        <Text className={styles.text}>
          3.我们将在十点10之前离开互跑点，每个点会留一位志愿者看管未取走的包裹直到晚上10点15，若逾期仍未取消，并出现包丢失的情况，青协将不承担任何责任，望大家理解。
        </Text>
      </View>
      <Popup
        title="温馨提示"
        detail="请在20点到22点之间使用该功能~"
        img={waitImg}
        isShow={timeShow}
        className={styles.popup}
      />
      <Popup
        img={waitImg}
        detail="号码牌已发完,请耐心等待！"
        isShow={fullShow}
      />
    </View>
  );
  // return <SafeRunAway />;
};

export default SafeRun;
