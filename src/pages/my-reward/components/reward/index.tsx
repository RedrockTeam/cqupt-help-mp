import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { timestampToDateString } from '@/common/helpers/date.ts'
import styles from './index.module.scss'

type Props = {
  level: number,
  name: string,
  organizer: string,
  activity: string,
  location: string,
  received: boolean,
  timeBegin: number,
  timeEnd: number,
}

const Reward = ({
  level,
  name,
  organizer,
  activity,
  location,
  received,
  timeBegin,
  timeEnd,
}: Props) => {

  const handleReceiveReward = async () => {
    const res = await Taro.showActionSheet({
      itemList: ['确定'],
      fail(e) {
        console.log(e)
      },
    })
    if (res.tapIndex === 0) {
      // TODO: request
    }
  }

  const renderBtn = () => {
    if (new Date().getTime() / 1000 > timeEnd) return (
      <Button disabled className={`${styles.btn} ${styles.btn_disabled}`}>已过期</Button>
    )
    if (received) return <Button className={`${styles.btn} ${styles.btn_disabled}`}>已领取</Button>
    return <Button className={styles.btn} onClick={handleReceiveReward}>领取奖品</Button>
  }

  return (
    <View className={styles.wrapper}>
      <View className={styles.header}>
        <Text className={styles.title}>{level}等奖：{name}</Text>
        <Text className={styles.organizer}>{organizer}</Text>
      </View>
      <View className={styles.content}>
        <View className={styles.info}>
          <View className={styles.infoKey}>参与活动：</View>
          <View className={styles.infoValue}>{activity}</View>
        </View>
        <View className={styles.info}>
          <View className={styles.infoKey}>领取地点：</View>
          <View className={styles.infoValue}>{location}</View>
        </View>
        <View className={styles.info}>
          <View className={styles.infoKey}>领取时间：</View>
          <View className={styles.infoValue}>
            {timestampToDateString(timeBegin)} - {timestampToDateString(timeEnd)}
          </View>
        </View>
      </View>
      <View className={styles.btnWrapper}>
        {renderBtn()}
      </View>
    </View>
  )
}

export default Reward
