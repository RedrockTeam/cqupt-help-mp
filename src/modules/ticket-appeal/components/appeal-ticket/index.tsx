/*
 * @Author: myjdml
 * @Date: 2021-04-15 10:45:04
 * @LastEditTime: 2021-04-15 17:15:38
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: \cqupt-help-mp\src\modules\ticket-appeal\components\appeal-ticket\index.tsx
 * 
 */
import { View, Text } from '@tarojs/components';
import React, { useState } from 'react';
import styles from './index.modules.scss';

type Props = {
  TicketAppealData: ticketAppealDataProps;
}

type ticketAppealDataProps = {
  message: string;
  reply: string;
  pass: number;
}

const AppealTicket = ({
  TicketAppealData,
}: Props) => {
  const [ title, setTitle ] = useState<string>(TicketAppealData.message)

  const currentTitle = TicketAppealData.message.slice(0, 9);
  if (TicketAppealData.message.length > 10) {
    setTitle(`${currentTitle}...`);
    TicketAppealData.message = currentTitle;
  }

  console.log(TicketAppealData);
  return (
    <View className={styles.wrapper}>
      <Text className={styles.title}>{title}</Text>
      <Text className={styles.time}>aa</Text>
    </View>
  )
}
export default AppealTicket;