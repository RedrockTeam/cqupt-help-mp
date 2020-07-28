import React from "react";
// import { View, Text, Button } from "@tarojs/components";
// import NavBack from "@/common/components/nav-back";
// import PrimaryButton from "@/common/components/primary-button";
// import Popup from "@/common/components/popup";
// import waitImg from "@/static/images/wait.png";
// import styles from "./index.module.scss";

import SafeRunAway from "../safe-run-away";

const SafeRun = () => {
  // return (
  //   <View className={styles.wrapper}>
  //     <NavBack title="天天护跑" background="#F6F6F9" />
  //     <View className={styles.history}>历史记录</View>
  //     <View className={styles.scanWrapper}>
  //       <View className={styles.scan} />
  //       <PrimaryButton className={styles.btn}>扫一扫</PrimaryButton>
  //       <Text className={styles.text}>扫一扫，快速取号码牌</Text>
  //     </View>
  //     <View className={styles.bottom}>
  //       <Text className={styles.title}>存包规则</Text>
  //       <Text className={styles.text}>1. 贵重物品还请自行妥善保。</Text>
  //       <Text className={styles.text}>
  //         2. 护跑时间从晚上8点到10点，请在9:45之前，根据自身情况来将存包拿。
  //       </Text>
  //       <Text className={styles.text}>
  //         3.我们将在十点10之前离开互跑点，每个点会留一位志愿者看管未取走的包裹直到晚上10点15，若逾期仍未取消，并出现包丢失的情况，青协将不承担任何责任，望大家理解。
  //       </Text>
  //     </View>
  //     <Popup
  //       title="温馨提示"
  //       detail="亲爱的同学，由于您上次取包时没有在指定的时间内到青协工作人员处取包。为了更好的保护你的存放物品，请您尽量在22:00之前到对应存包处拿走您的存放物品。"
  //       isShow={false}
  //       className={styles.popup}
  //       bottom={<Button className={styles.knowBtn}>我知道了</Button>}
  //     />
  //     <Popup img={waitImg} detail="号码牌已发完,请耐心等待！" isShow />
  //   </View>
  // );
  return <SafeRunAway />;
};

export default SafeRun;
