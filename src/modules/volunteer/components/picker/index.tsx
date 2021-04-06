import React from "react";
import {Button, Image, ITouchEvent, View,} from "@tarojs/components";
import cancel from "@/static/images/cancel.png";
import styles from "./index.module.scss";
import PickerTimeBasic from "@/modules/volunteer/components/picker-time-basic";


type Props = {
  visible: boolean;
  onCancel: (event: ITouchEvent) => unknown;
  onOk: (event: ITouchEvent) => unknown;
  onTimeChange: (event: ITouchEvent) => unknown;
  onPickStart: () => unknown;
  onPickEnd: () => unknown;
  value: any;
  dateIndex: number;
};

const Picker = ({
                  visible,
                  onCancel,
                  onOk,
                  onTimeChange,
                  onPickStart,
                  onPickEnd,
                  value,
                  dateIndex,
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
          <View className={styles.vTitle}>选择时间</View>
          <Image src={cancel} className={styles.vIcon} onClick={onCancel}/>
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
          确认提交
        </Button>
      </View>
    </View>
  );
};

export default Picker;
