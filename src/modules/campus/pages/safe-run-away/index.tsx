import React from "react";
import { View, Image } from "@tarojs/components";
import PrimaryButton from "@/common/components/primary-button";
import clockIcon from "@/static/images/clock-icon.png";
// import locateIcon from "@/static/images/locate-icon.png";
import { useQuery } from "react-query/dist/react-query.production.min";
import PopupContext from "@/stores/popup";
import { resolvePage } from "@/common/helpers/utils";
import { showActionSheet, switchTab } from "@tarojs/taro";
import { useContainer } from "unstated-next";
import connectIcon from "@/static/images/connect-icon.png";
import NavBack from "@/common/components/nav-back";
import success from "@/static/images/rob-success.png";
import error from "@/static/images/error.png";
import { plates } from "@/common/constants";
import { useMutation } from "react-query";
import { returnPlate, getStatus } from "../../services";
import styles from "./index.module.scss";

type Props = {
  number: number;
  plate: string;
};

const SafeRunAway = ({ number, plate }: Props) => {
  const Popup = useContainer(PopupContext);
  const [mutateReturn] = useMutation(returnPlate);
  const { data } = useQuery("getStatus", getStatus);
  const hasPlate = data?.plate;

  const handleTakeBag = async () => {
    const res = await showActionSheet({
      itemList: ["确定"],
      fail(e) {
        console.log(e);
      },
    });
    if (res.tapIndex === 0) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const data = await mutateReturn(hasPlate);
        if (data.status === 10000) {
          const hide = Popup.show({
            img: success,
            title: "取包成功",
            detail: "5s之后自动返回",
          });
          setTimeout(() => {
            hide();
            switchTab({ url: resolvePage("index", "home") });
          }, 5000);
        } else {
          const hide = Popup.show({
            title: "取包失败",
            detail: "请稍后再试",
          });
          setTimeout(() => hide(), 3000);
          return null;
        }
      } catch (e) {
        const hide = Popup.show({
          img: error,
          title: "登录失败",
          detail: "网络错误",
        });
        setTimeout(() => hide(), 3000);
      }
    }
  };
  return (
    <View className={styles.wrapper}>
      <NavBack title="天天护跑" background="#F6F6F9" />
      <View className={styles.top}>
        <View className={styles.num}>{plate + number}</View>
        <View className={styles.tip}>请务必在 9 点 30 前取出</View>
        <Image src={connectIcon} className={styles.left} />
        <Image src={connectIcon} className={styles.right} />
      </View>
      <View className={styles.bottom}>
        <View className={styles.text}>
          <Image mode="aspectFit" src={clockIcon} className={styles.icon} />
          {plates[plate] + number}号点
        </View>
        {/* 原型图没有 */}
        {/* <View className={styles.text}>
          <Image mode="aspectFit" src={locateIcon} className={styles.icon} />
          2020-06-17 17:30 存
        </View> */}
      </View>
      <PrimaryButton className={styles.btn} onClick={handleTakeBag}>
        取包
      </PrimaryButton>
      <Popup.Comp />
    </View>
  );
};

export default SafeRunAway;
