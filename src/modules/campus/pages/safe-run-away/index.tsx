import React, { useState } from "react";
import { View, Image } from "@tarojs/components";
import PrimaryButton from "@/common/components/primary-button";
import clockIcon from "@/static/images/clock-icon.png";
import locateIcon from "@/static/images/locate-icon.png";
import {
  useQuery,
  useMutation,
} from "react-query/dist/react-query.production.min";
import PopupContext from "@/stores/popup";
import { resolvePage } from "@/common/helpers/utils";
import { switchTab } from "@tarojs/taro";
import BottomPop from "@/common/components/bottomPop";
import { useContainer } from "unstated-next";
import connectIcon from "@/static/images/connect-icon.png";
import NavBack from "@/common/components/nav-back";
import success from "@/static/images/rob-success.png";
import error from "@/static/images/error.png";
import { plates } from "@/common/constants";
import { timestampToTimeString } from "@/common/helpers/date";
import { returnPlate, getStatus } from "../../services";
import styles from "./index.module.scss";

type Props = {
  number: number;
  plate: string;
  saveTime: number;
};

const SafeRunAway = ({ number, plate, saveTime }: Props) => {
  const Popup = useContainer(PopupContext);
  const [bottomVisible, setVisible] = useState(false);
  const [mutateReturn] = useMutation(returnPlate);
  const { data } = useQuery("getStatus", getStatus);
  const hasPlate = data?.plate;

  const handleCancle = () => {
    setVisible(false);
  };

  const ShowBottom = () => {
    setVisible(true);
  };

  const handleTakeBag = async () => {
    setVisible(false);
    try {
      const data = await mutateReturn(hasPlate);
      if (data.status === 10000) {
        const hide = Popup.show({
          img: success,
          title: "取包成功",
          detail: "1.5s之后自动返回",
        });
        setTimeout(() => {
          hide();
          switchTab({ url: resolvePage("index", "home") });
        }, 1500);
      } else {
        const hide = Popup.show({
          img: error,
          title: "取包失败",
          detail: "请稍后再试",
        });
        setTimeout(() => hide(), 1500);
        return null;
      }
    } catch (e) {
      const hide = Popup.show({
        img: error,
        title: "取包失败",
        detail: "网络错误",
      });
      setTimeout(() => hide(), 1500);
    }
  };
  return (
    <View className={styles.wrapper}>
      <NavBack title="天天护跑" background="#F6F6F9" />
      <View className={styles.top}>
        <View className={styles.num}>{plate + number}</View>
        <View className={styles.tip}>请务必在 9:30 前取出</View>
        <Image src={connectIcon} className={styles.left} />
        <Image src={connectIcon} className={styles.right} />
      </View>
      <View className={styles.bottom}>
        <View className={styles.text}>
          <Image mode="aspectFit" src={locateIcon} className={styles.icon} />
          {plates[plate] + number}号点
        </View>
        <View className={styles.text}>
          <Image mode="aspectFit" src={clockIcon} className={styles.icon} />
          {timestampToTimeString(saveTime)} 存
        </View>
      </View>
      <PrimaryButton className={styles.btn} onClick={ShowBottom}>
        取包
      </PrimaryButton>
      <BottomPop
        isShow={bottomVisible}
        onCancel={handleCancle}
        onOk={handleTakeBag}
        title="确定取出此包？"
      />
      <Popup.Comp />
    </View>
  );
};

export default SafeRunAway;
