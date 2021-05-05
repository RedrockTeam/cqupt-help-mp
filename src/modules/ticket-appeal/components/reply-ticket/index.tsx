import { View, Text } from '@tarojs/components';
import React, { useState } from 'react';
import styles from './index.module.scss';

type Props = {
  reply: string;
}

const ReplyTicket = ({
  reply
}) => {
  return (
    <View className={styles.wrapper}>
      <View className={styles.title}>驳回理由</View>
      <View className={styles.reply}>{reply}</View>
    </View>
  )
}
export default ReplyTicket;