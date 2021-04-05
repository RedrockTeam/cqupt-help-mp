import React from "react";
import {Button, Text, View} from "@tarojs/components";
import {now, timestampToDateString, timestampToFormString,} from "@/common/helpers/date";
import {navTo, resolvePage} from "@/common/helpers/utils";
import styles from "./index.module.scss";
import {MyActivity} from "../../services/dto";

// 将秒为单位的时间转换为 [00]:[00]
const translateTimeToClock = (begin_time: number, end_time: number) => {
  const beginHour = begin_time / (60 * 60);
  const beginMinute = begin_time % (60 * 60);
  const endHour = end_time / (60 * 60);
  const endMinute = end_time % (60 * 60);
  const beginTime = [
    beginHour < 10 ? `0${beginHour}` : beginHour,
    beginMinute < 10 ? `0${beginMinute}` : beginMinute,
  ];
  const endTime = [
    endHour < 10 ? `0${endHour}` : endHour,
    endMinute < 10 ? `0${endMinute}` : endMinute,
  ];
  console.log("beginTime: ", beginTime, "\nendTime: ", endTime);

  return {
    beginTime: `${beginTime[0]}:${beginTime[1]}`,
    endTime: `${endTime[0]}:${endTime[1]}`,
  };
};

const Activity = ({
                    rely_id,
                    is_change,
                    type,
                    id,
                    name,
                    team_name,
                    last_date,
                    start_date,
                    registration_time,
                    result,
                    time_part,
                    date: activityDate,
                    if_read,
                  }: MyActivity) => {
  const [month, date] = timestampToDateString(registration_time)
    .split(".")
    .slice(1);

  console.log(`month: ${month}, date: ${date}`);

  // 整个活动时间
  const startDate = timestampToFormString(start_date).split(" ")[0];
  const lastDate = timestampToFormString(last_date).split(" ")[0];

  // 用户选择参与 的活动时间段
  const [acMonth, acDate] = timestampToDateString(activityDate as number)
    .split(".")
    .slice(1);
  console.log(activityDate, acMonth, acDate);

  const {beginTime, endTime} = translateTimeToClock(
    time_part.begin_time,
    time_part.end_time
  );
  const time_area = `${acMonth}月${acDate}日 ${beginTime}-${endTime}`;

  /**
   *  创建按钮
   * @param btnType :number :0:详细信息，1:等待结果，2:查看结果
   * @param id
   */
  const renderBtn = (btnType: 0 | 1 | 2, id: number) => {
    switch (btnType) {
      case 0:
        return (
          <Button
            className={`${styles.btn} ${styles.btn_detail}`}
            onClick={() =>
              navTo({
                url: `${resolvePage("volunteer", "detail")}?rely_id=${rely_id}`,
              })
            }
          >
            详细信息
          </Button>
        );

      case 1:
      case 2:
        return (
          <Button
            className={`${styles.btn} ${styles.btn_check}`}
            onClick={() => {
              navTo({
                url: `${resolvePage(
                  "volunteer",
                  "application"
                )}?name=${name
                }&team_name=${team_name
                }&start_date=${startDate
                }&last_date=${lastDate
                }&concat=${result?.qq
                }&pass=${result?.pass
                }&date=${time_area
                }&registration_time=${registration_time
                }&activity_id=${id
                }&rely_id=${rely_id
                }&is_change=${is_change}`,
              });
            }}
          >
            查看结果
          </Button>
        );
    }
  };

  /**
   * 报名结果的状态    1: 等待结果 2 :查看结果
   */
  const ifPassed = (): 1 | 2 => {
    console.log("pass:", typeof result?.pass);

    return result?.pass === "0" ? 1 : 2;
  };

  //  是否已过期
  const isOverdue = () => now() > last_date;

  return (
    <View
      className={type === 0 ? styles.commonWrapper : styles.volunteerWrapper}
    >
      {/* 普通活动右侧时间条 */}
      {type === 0 ? (
        <View className={styles.commonLeft}>
          <Text className={styles.big}>{date}</Text>
          <Text className={styles.small}>{month}</Text>
        </View>
      ) : null}

      <View className={type === 0 ? styles.commonRight : styles.volunteer}>
        <View className={styles.header}>
          <Text>{name}</Text>
          {isOverdue() ? (
            <Text className={styles.passed}>已结束</Text>
          ) : (
            <Text className={styles.doing}>进行中</Text>
          )}
        </View>
        <Text className={styles.info}>活动组织：{team_name}</Text>

        {/* 两种活动文案不同 */}
        {type === 0 ? (
          <Text className={styles.info}>
            活动时间：{startDate}-{lastDate}
          </Text>
        ) : (
          <Text className={styles.info}>报名参与时间：{time_area}</Text>
        )}

        {/* 志愿活动的按钮 */}
        {type !== 0 && !isOverdue() ?
          // {type !== 0 ?
          (<View className={styles.btnWrapper}>
            {renderBtn(0, id)}
            {renderBtn(ifPassed(), id)}
            {if_read === 1 && ifPassed() === 2 ? (
              <View className={styles.btn_red_point}/>
            ) : null}
          </View>)
          : null
        }
      </View>
    </View>
  );
};

export default Activity;
