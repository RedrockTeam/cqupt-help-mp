import React from 'react'
import { View, Text } from '@tarojs/components'
import { now, timestampToDateString } from '@/common/helpers/date'
import styles from './index.module.scss'

type Props = {
  time: number,
  beginTime: number,
  endTime: number,
  name: string,
  organizer: string,
}

const Activity = ({ time, name, organizer, beginTime, endTime }: Props) => {
  const [mounth, date] = timestampToDateString(time).split('.').slice(1)
  
  return (
    <View className={styles.wrapper}>
      <View className={styles.left}>
        <Text className={styles.big}>{date}</Text>
        <Text className={styles.small}>{mounth}</Text>
      </View>
      <View className={styles.right}>
        <View className={styles.header}>
          <Text>{name}</Text>
          {now > endTime
            ? <Text className={styles.passed}>已结束</Text>
            : <Text className={styles.doing}>进行中</Text>
          }
        </View>
        <Text className={styles.info}>活动组织：{organizer}</Text>
        <Text className={styles.info}>
          活动时间：{timestampToDateString(beginTime)} - {timestampToDateString(endTime)}
        </Text>
      </View>
    </View>
  )
}

export default Activity
