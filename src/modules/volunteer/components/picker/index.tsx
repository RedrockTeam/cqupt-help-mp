import React from "react";
import {Button, Image, ITouchEvent, View,} from "@tarojs/components";
import cancel from "@/static/images/cancel.png";
import styles from "./index.module.scss";
import PickerTimeBasic from "@/modules/volunteer/components/picker-time-basic";

type Props = {
  title?: string;
  btnText?: string;
  visible: boolean;
  onCancel: (event: ITouchEvent) => unknown;
  onOk: (event: ITouchEvent) => unknown;
  onTimeChange: (event: ITouchEvent) => unknown;
  onPickStart: () => unknown;
  onPickEnd: () => unknown;
  viewItems: any;
  dateIndex: number;
  value: number[];
};

const Picker = ({
  visible,
  title = "选择时间",
  btnText = "确认提交",
  onCancel,
  onOk,
  onTimeChange,
  onPickStart,
  onPickEnd,
  viewItems,
  dateIndex,
  value,
}: Props) => {
  return (
    <View
      className={`${styles.mask} ${
        visible ? styles.maskShow : styles.maskHide
      }`}
    >
      <View
        className={`${styles.verify} ${visible ? styles.show : styles.hide}`}
      >
        <View className={styles.vTop}>
          <View className={styles.vTitle}>{title}</View>
          <Image src={cancel} className={styles.vIcon} onClick={onCancel} />
        </View>
        <View className={styles.vInfos}>
          <PickerTimeBasic
            onTimeChange={onTimeChange}
            onPickStart={onPickStart}
            onPickEnd={onPickEnd}
            value={value}
            dateIndex={dateIndex}/>

        </View>
        <Button className={styles.vBtn} onClick={onOk}>
          {btnText}
        </Button>
      </View>
    </View>
  );
};

export default Picker;
