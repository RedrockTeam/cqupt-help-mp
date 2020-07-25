import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import PrimaryButton from '@/common/components/primary-button'
import NavBack from '@/common/components/nav-back'
import emptyImg from '@/static/images/empty.png'
import Reward from './components/reward'
import styles from './index.module.scss'

const rewardList = [
  {
    level: 1,
    name: '兔子闹钟',
    organizer: '红岩网校',
    activity: '伟大成就翻翻看',
    location: '红岩网校工作站B区',
    received: false,
    beginTime: 1587484800,
    endTime: 1665360000,
  },
  {
    level: 2,
    name: '闹钟tutu',
    organizer: '红岩网校',
    activity: '伟大成就翻翻看',
    location: '红岩网校工作站B区',
    received: true,
    beginTime: 1587484800,
    endTime: 1665360000,
  },
  {
    level: 2,
    name: '闹钟tutuooo',
    organizer: '红岩网校',
    activity: '伟大成就翻翻看',
    location: '红岩网校工作站B区',
    received: false,
    beginTime: 1587484800,
    endTime: 1587484800,
  },
  {
    level: 2,
    name: '闹钟tutzzzu',
    organizer: '红岩网校',
    activity: '伟大成就翻翻看',
    location: '红岩网校工作站B区',
    received: true,
    beginTime: 1587484800,
    endTime: 1587484800,
  },
]

const MyReward = () => {
  const handleNavigateToActivity = () => Taro.navigateTo({ url: '' }) // TODO
  const hasRewards = rewardList.length !== 0
  const renderRewardList = () => (
    <View className={styles.wrapper}>
      <NavBack title='我的奖品' background='#F6F6F9' />
      {rewardList.length && rewardList.map(e => <Reward {...e} key={`${e.activity}-${e.name}`} />)}
    </View>
  )
  const renderEmpty = () => (
    <View className={styles.emptyWrapper}>
      <NavBack title='我的奖品' background='#FFFFFF' />
      <Image src={emptyImg} className={styles.img} />
      <Text className={styles.text}>奖品空空如也哦~</Text>
      <Text className={styles.text}>快去参加活动领取奖品吧</Text>
      <PrimaryButton
        className={styles.btn}
        onClick={handleNavigateToActivity}
      >查看活动</PrimaryButton>
    </View>
  )
  return hasRewards ? renderRewardList() : renderEmpty()
}

export default MyReward
