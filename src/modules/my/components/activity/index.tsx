import React from "react";
import { View, Text, Button } from "@tarojs/components";
import { now, timestampToDateString, timestampToFormString } from "@/common/helpers/date";
import styles from "./index.module.scss";
import { render } from "@tarojs/taro";
import { navTo, resolvePage } from "@/common/helpers/utils";

type Props = {
  name: string;
  id: number;
  type: 0 | 1;
  teamName: string;
  myregistration: number;
  last_date: number;
  start_date: number;
};

const Activity = ({
  type,
  id,
  name,
  teamName,
  last_date,
  start_date,
  myregistration
}: Props) => {
  const [mounth, date] = timestampToDateString(myregistration)
    .split(".")
    .slice(1);

  console.log(`mounth: ${mounth}, date: ${date}`);

  const startDate = timestampToFormString(start_date).split(' ')[0]
  const lastDate = timestampToFormString(last_date).split(' ')[0]



  /**
   * 
   * @param btnType :number :0:详细信息，1:等待结果，2:查看结果
   */
  const renderBtn = (btnType: 0 | 1 | 2, id) => {
    if (btnType === 0) {
      return (
        <Button className={`${styles.btn} ${styles.btn_detail}`}
          onClick={() =>
            navTo({
              url: `${resolvePage("volunteer", "detail")}?id=${id}`,
            })
          }
        >
          详细信息
        </Button>
      )
    }
    if (btnType === 1) {
      return (
        <Button className={`${styles.btn} ${styles.btn_waitting}`}>
          等待结果
        </Button>
      );
    }
    if (btnType === 2) {
      return (
        <Button className={`${styles.btn} ${styles.btn_check}`}
          onClick={() => {
            navTo({
              url: `${resolvePage("volunteer", "application")}?id=${id}`,
            })
            console.log('go to application', id);
          }
          }
        >
          查看结果
        </Button>
      );
    }
  }

  /**
   * 报名结果的状态
   * @param{return 1 | 2}  1:等待结果，2:查看结果
   */
  const ifChecked = (): 1 | 2 => {
    return 2
  }


  return (
    <View className={type === 0 ? styles.commonWrapper : styles.volunteerWrapper}>

      {/* 普通活动右侧时间条 */}
      {
        type === 0 ? (
          <View className={styles.commonLeft}>
            <Text className={styles.big}>{date}</Text>
            <Text className={styles.small}>{mounth}</Text>
          </View>
        ) : null
      }

      <View className={type === 0 ? styles.commonRight : styles.volunteer}>
        <View className={styles.header}>
          <Text>{name}</Text>
          {now() > last_date ? (
            <Text className={styles.passed}>已结束</Text>
          ) : (
              <Text className={styles.doing}>进行中</Text>
            )}
        </View>
        <Text className={styles.info}>
          活动组织：{teamName}
        </Text>
        <Text className={styles.info}>
          活动时间：{startDate}-{lastDate}
        </Text>
        {
          type === 0 ? null :
            (
              <View className={styles.btnWrapper}>{renderBtn(0, id)}{renderBtn(ifChecked(), id)}</View>
            )
        }
      </View>
    </View>

  );
};

export default Activity;
