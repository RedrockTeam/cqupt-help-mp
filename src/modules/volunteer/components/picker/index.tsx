import React from "react";
import {
  View,
  Button,
  Image,
  PickerView,
  PickerViewColumn,
  ITouchEvent,
} from "@tarojs/components";
import cancel from "@/static/images/cancel.png";
import { timestampToDayjs, timestampToDateString } from "@/common/helpers/date";
import styles from "./index.module.scss";

const timetampToHMString = (timestamp: number) =>
  timestampToDayjs(timestamp - 8 * 60 * 60).format("HH:mm");

type Props = {
  visible: boolean;
  onCancel: (event: ITouchEvent) => unknown;
  onOk: (event: ITouchEvent) => unknown;
  onTimeChange: (event: ITouchEvent) => unknown;
  value: any;
  dateIndex: number;
};

const Picker = ({
  visible,
  onCancel,
  onOk,
  onTimeChange,
  value,
  dateIndex,
}: Props) => {
  console.log(value.timePartList);

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
          <Image src={cancel} className={styles.vIcon} onClick={onCancel} />
        </View>
        <View className={styles.vInfos}>
          <PickerView
            indicatorStyle="height:58px"
            className={styles.picker}
            onChange={onTimeChange}
          >
            <PickerViewColumn>
              {value.dateList.map((item) => {
                return (
                  <View style={{ lineHeight: "58px" }} key={`${item}`}>
                    {`${timestampToDateString(item)}`}
                  </View>
                );
              })}
            </PickerViewColumn>
            <PickerViewColumn>
              {value.timePartList[dateIndex].map((item) => {
                return (
                  <View
                    style={{ lineHeight: "58px" }}
                    key={`${item.begin_time} + ${item.end_time}`}
                  >
                    {`${timetampToHMString(
                      item.begin_time
                    )} - ${timetampToHMString(item.end_time)}`}
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
  );
};

export default Picker;
