import React from "react";
import { View, Image, Button } from "@tarojs/components";
import { resolvePage, navTo } from "@/common/helpers/utils";
import avator from "@/static/images/empty.png";
import NavBack from "@/common/components/nav-back";
import styles from "./index.module.scss";

const info = [
  {
    id: 0,
    name: "邮小岩",
    title: "摸鱼协会会长",
    time: "2020年10月20日",
    department: "摸鱼协会",
  },
  {
    id: 1,
    name: "邮小岩",
    title: "摸鱼协会会长",
    time: "2020年10月20日",
    department: "摸鱼协会",
  },
];

const IdIndex = () => {
  return (
    <View className={styles.wrapper}>
      <NavBack title="身份有证" background="#FFFFFF" />
      {info.map((item) => (
        <View className={styles.card} key={item.id}>
          <View className={styles.top}>
            <Image src={avator} className={styles.avator} />
            <View className={styles.top_right}>
              <View className={styles.name}>{item.name}</View>
              <View className={styles.info}>{item.title}</View>
            </View>
          </View>
          <View className={styles.footer}>
            <View className={styles.time}> {item.time}</View>
            <View className={styles.department}>{item.department}</View>
          </View>
        </View>
      ))}
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
