import React from "react";
import { timePart } from "@/common/constants";
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

type Props = {
  visible: boolean;
  onCancel: (event: ITouchEvent) => unknown;
  onOk: (event: ITouchEvent) => unknown;
  onTimeChange: (event: ITouchEvent) => unknown;
};

const Picker = ({ visible, onCancel, onOk, onTimeChange }: Props) => {
  // const onTimeChange = (e) => {
  //   console.log(e.detail);
  // };

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
            onChange={onTimeChange}
          >
            <PickerViewColumn>
              {timePart.map((item) => {
                return (
                  <View style={{ lineHeight: "58px" }} key={item}>
                    {item}
                  </View>
                );
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
