import React from "react";
import {ITouchEvent, PickerView, PickerViewColumn, View,} from "@tarojs/components";
import {timestampToDateString, timestampToMDString, timestampToHMString} from "@/common/helpers/date";
import styles from "./index.module.scss";


type Prop = {
  onTimeChange: (event: ITouchEvent) => unknown;
  onPickStart: () => unknown;
  onPickEnd: () => unknown;
  value: any;
  dateIndex: number;
  valueIndex: number[];
  format?: 'YY.MM.DD' | 'Y.M';
}

const PickerTimeBasic = ({
                           onTimeChange,
                           onPickStart,
                           onPickEnd,
                           value,
                           dateIndex,
                           valueIndex = [0, 0],
                           format = 'YY.MM.DD',
                         }: Prop) => {

  console.log('value:', value);
  console.log('dateIndex:', dateIndex);

  return (
    <PickerView
      indicatorStyle="height:58px"
      className={styles.picker}
      onChange={onTimeChange}
      onPickStart={onPickStart}
      onPickEnd={onPickEnd}
      value={valueIndex}
    >
      <PickerViewColumn
      >
        {value.dateList.map((item) => {
          return (
            <View style={{lineHeight: "58px"}} key={`${item}`}>
              {
                format === 'YY.MM.DD' ?
                  `${timestampToDateString(item)}`
                  :
                format === 'Y.M' ?
                  `${timestampToMDString(item)}`
                  : null
              }
            </View>
          );
        })}
      </PickerViewColumn>
      <PickerViewColumn>
        {value.timePartList[dateIndex].map((item) => {
          return (
            <View
              style={{lineHeight: "58px"}}
              key={`${item.begin_time} + ${item.end_time}`}
            >
              {`${timestampToHMString(
                item.begin_time
              )} - ${timestampToHMString(item.end_time)}`}
            </View>
          );
        })}
      </PickerViewColumn>
    </PickerView>
  )
}

export default PickerTimeBasic;
