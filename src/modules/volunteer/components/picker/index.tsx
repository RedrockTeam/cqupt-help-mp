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
import {
  timestampToDateString,
  timestampToHMString,
} from "@/common/helpers/date";
import styles from "./index.module.scss";

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
          <PickerView
            indicatorStyle="height:58px"
            className={styles.picker}
            onChange={onTimeChange}
            onPickStart={onPickStart}
            onPickEnd={onPickEnd}
            value={value}
          >
            <PickerViewColumn className={styles.pickerItem}>
              {viewItems.dateList.map((item) => {
                return (
                  <View
                    style={{ lineHeight: "58px" }}
                    key={`${item}`}
                    className={styles.pickerItem}
                  >
                    {`${timestampToDateString(item)}`}
                  </View>
                );
              })}
            </PickerViewColumn>
            <PickerViewColumn>
              {viewItems.timePartList[dateIndex].map((item, index) => {
                return (
                  <View
                    style={{ lineHeight: "58px" }}
                    className={styles.pickerItem}
                    key={`${item}${index}`}
                  >
                    {`${timestampToHMString(
                      item.begin_time
                    )} - ${timestampToHMString(item.end_time)}`}
                  </View>
                );
              })}
            </PickerViewColumn>
          </PickerView>
        </View>
        <Button className={styles.vBtn} onClick={onOk}>
          {btnText}
        </Button>
      </View>
    </View>
  );
};

export default Picker;
