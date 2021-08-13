import React from "react";
import { View, Text } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import runImg from "@/static/images/run-icon.png";
// import iceCreamImg from "@/static/images/ice-cream-icon.png";
import { resolvePage } from "@/common/helpers/utils";
import Card from "../../components/card";
import styles from "./index.module.scss";

const Campus = () => {
  return (
    <View className={styles.wrapper}>
      <NavBack title="校园服务" background="#F6F6F9" />
      <View className={styles.block}>
        <Text className={styles.title}>生活服务</Text>
        <Card
          img={runImg}
          title="天天护跑"
          organization="青年志愿者协会"
          link={resolvePage("campus", "safe-run")}
        />
      </View>
      {/* TODO:第一版可以暂时不上 */}
      {/* <View className={styles.block}>
        <Text className={styles.title}>吃喝玩乐</Text>
        <Card
          img={iceCreamImg}
          title="摇一摇"
          organization="红岩网校工作站"
          link={resolvePage("campus", "shark-it")}
        />
      </View> */}
    </View>
  );
};

export default Campus;
