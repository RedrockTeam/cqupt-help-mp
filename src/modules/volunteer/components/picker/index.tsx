import React from "react";
import { resolvePage, navTo } from "@/common/helpers/utils";
import {
  View,
  Button,
  Image,
  PickerView,
  PickerViewColumn,
  ITouchEvent,
} from "@tarojs/components";
import cancel from "@/static/images/cancel.png";
import styles from "./index.module.scss";

const list = {
  days: ["7月13日", "7月14日"],
  time: [
    ["10:00 - 12:00", "12:00 - 14:00"],
    ["13:00-15:00", "15:00-18:00"],
  ],
};

type Props = {
  visible: boolean;
  onCancel: (event: ITouchEvent) => unknown;
  onOk: (event: ITouchEvent) => unknown;
};

const Picker = ({ visible, onCancel, onOk }: Props) => {
  const onTimeChange = (e) => {
    console.log(e.detail);
  };

  return visible ? (
    <View className={styles.mask}>
      <View className={styles.verify}>
        <View className={styles.vTop}>
          <View className={styles.vTitle}>选择时间</View>
          <Image src={cancel} className={styles.vIcon} onClick={onCancel} />
        </View>
        <View className={styles.vInfos}>
          <PickerView
            indicatorStyle="height:58px"
            className={styles.picker}
            onChange={(e) => {
              onTimeChange(e);
            }}
          >
            <PickerViewColumn>
              {list.days.map((item) => {
                return <View style={{ lineHeight: "58px" }}>{item}</View>;
              })}
            </PickerViewColumn>
            <PickerViewColumn>
              {list.time[0].map((item) => {
                return <View style={{ lineHeight: "58px" }}>{item}</View>;
              })}
            </PickerViewColumn>
          </PickerView>
        </View>
        <Button className={styles.vBtn} onClick={onOk}>
          确认提交
        </Button>
      </View>
    </View>
  ) : null;
};

export default Picker;
