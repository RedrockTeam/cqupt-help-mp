import React from "react";
import { View, Button, Image, ITouchEvent } from "@tarojs/components";
import { resolvePage, navTo } from "@/common/helpers/utils";
import cancel from "@/static/images/cancel.png";
import styles from "./index.module.scss";

type Props = {
  visible: boolean;
  phone: number;
  IdCardNum: string;
  volunteerNum: string;
  onCancel: (event: ITouchEvent) => unknown;
};

const Popup = ({
  visible,
  phone,
  IdCardNum,
  volunteerNum,
  onCancel,
}: Props) => {
  return visible ? (
    <View className={styles.mask}>
      <View className={styles.verify}>
        <View className={styles.vTop}>
          <View className={styles.vTitle}>信息核对</View>
          <Image src={cancel} className={styles.vIcon} onClick={onCancel} />
        </View>
        <View className={styles.vInfos}>
          <View className={styles.vInfo}>
            <View className={styles.vInfoT}>电话号码:</View>
            <View className={styles.vInfoC}>{phone}</View>
          </View>
          <View className={styles.vInfo}>
            <View className={styles.vInfoT}>身份证号:</View>
            <View className={styles.vInfoC}>{IdCardNum}</View>
          </View>
          <View className={styles.vInfo}>
            <View className={styles.vInfoT}>志愿者账号:</View>
            <View className={styles.vInfoC}>{volunteerNum}</View>
          </View>
        </View>
        <Button
          className={styles.vBtn}
          onClick={() => navTo({ url: resolvePage("volunteer", "index") })}
        >
          确认提交
        </Button>
      </View>
    </View>
  ) : null;
};

export default Popup;
