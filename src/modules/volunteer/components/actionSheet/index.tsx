import {ITouchEvent, Text, View} from "@tarojs/components";
import styles from "@/modules/volunteer/components/actionSheet/index.module.scss";
import React from "react";

type Props = {
  sheetKey?: string | Symbol;   //  标识该组件的元信息
  visible: boolean;
  showCancel: boolean;
  showTitle: boolean;
  title: {
    desc: string;
    detail: string;
  };
  itemList: string[];
  onClick: (obj: { tarText: string, indexKey: number, sheetKey: string | Symbol | undefined }) => unknown;
  onCancel: (event: ITouchEvent) => unknown;
}

const ActionSheet = ({
                       visible,
                       showCancel,
                       showTitle,
                       itemList,
                       title,
                       onClick,
                       onCancel,
                       sheetKey
                     }: Props) => {
  return (
    <View
      className={`${styles.mask} ${
        visible ? styles.maskShow : styles.maskHide
      }`}
      onClick={onCancel}
    >
      <View
        className={`${styles.content} ${visible ? styles.show : styles.hide}`}
        onClick={e => e.stopPropagation()}
      >
        {showTitle ? (
          <View
            className={styles.title}
          >
            <Text className={styles.title_desc}>{title.desc}</Text>
            {title.detail ? (<Text className={styles.title_detail}>{title.detail}</Text>) : null}
          </View>) : null}
        {itemList.map((item, i) => {
          return (
            <View key={i}
                  onClick={() => onClick({indexKey: i, tarText: item, sheetKey})}
            >
              {item}
            </View>
          )
        })}
        {showCancel ?
          (
            <View
              className={styles.cancel}
              onClick={onCancel}
            >
              取消
            </View>
          ) : null}
      </View>

    </View>
  )

};

// @ts-ignore
export default ActionSheet;
