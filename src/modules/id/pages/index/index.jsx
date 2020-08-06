import React from "react";
import { navigateBack } from "@tarojs/taro";
import { View, Image, Button, Text, OpenData } from "@tarojs/components";
import { resolvePage, navTo } from "@/common/helpers/utils";
import NavBack from "@/common/components/nav-back";
import { useQuery } from "react-query/dist/react-query.production.min";
import Loading from "@/common/components/loading";
import emptyImg from "@/static/images/empty.png";
import PrimaryButton from "@/common/components/primary-button";
import { IdCard } from "../../services/dto";
import { getIdCardList } from "../../services";
import styles from "./index.module.scss";

// const info = [
//   {
//     id: 0,
//     name: "邮小岩",
//     title: "摸鱼协会会长",
//     time: "2020年10月20日",
//     department: "摸鱼协会",
//   },
//   {
//     id: 1,
//     name: "邮小岩",
//     title: "摸鱼协会会长",
//     time: "2020年10月20日",
//     department: "摸鱼协会",
//   },
// ];

const IdIndex = () => {
  const { data: idCardListRes } = useQuery("getIdCardList", getIdCardList);
  if (!idCardListRes) {
    return <Loading />;
  }
  if (idCardListRes.status !== 10000) {
    return "Error";
  }

  if (idCardListRes.identity_cards.length === 0) {
    return (
      <View className={styles.emptyWrapper}>
        <NavBack title="身份有证" background="#FFFFFF" />
        <Image src={emptyImg} className={styles.img} />
        <Text className={styles.text}>证件空空如也哦～</Text>
        <Text className={styles.text}>快去申请新的会员证吧</Text>
        <PrimaryButton
          className={styles.btn}
          onClick={() => navTo({ url: resolvePage("id", "apply") })}
        >
          申请证件
        </PrimaryButton>
      </View>
    );
  }
  // TODO:时间处理
  return (
    <View className={styles.wrapper}>
      <NavBack title="身份有证" background="#FFFFFF" />
      {idCardListRes.identity_cards?.map((item) => (
        <View
          className={styles.card}
          key={item.name + item.team_name + item.collage}
        >
          <View className={styles.top}>
            <OpenData
              className={styles.avator}
              type="userAvatarUrl"
              defaultAvatar={emptyImg}
            />
            <View className={styles.top_right}>
              <View className={styles.name}>{item.name}</View>
              <View className={styles.info}>{item.team_name}会员</View>
            </View>
          </View>
          <View className={styles.footer}>
            <View className={styles.time}> {item.create_time}</View>
            <View className={styles.department}>学生社团管理部</View>
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
