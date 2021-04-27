/*
 * @Author: myjdml
 * @Date: 2021-04-15 10:45:04
 * @LastEditTime: 2021-04-15 17:15:38
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: \cqupt-help-mp\src\modules\ticket-appeal\components\appeal-ticket\index.tsx
 * 
 */
import { timestampToDateString, timestampToHMString } from '@/common/helpers/date';
import { View, Text } from '@tarojs/components';
import React, { useState } from 'react';
import styles from './index.module.scss';

type Props = {
  TicketAppealData: ticketAppealDataProps;
}

type ticketAppealDataProps = {
  message: string;
  reply: string;
  pass: number;
  registration_time: number;
}

const AppealTicket = ({
  TicketAppealData,
}: Props) => {
  const [ title, setTitle ] = useState<string>(TicketAppealData.message)
  // 处理过长的字符串
  const currentTitle = TicketAppealData.message.slice(0, 14);
  if (TicketAppealData.message.length > 15) {
    setTitle(`${currentTitle}...`);
    TicketAppealData.message = currentTitle;
  }

  const handelTimeToText = (timestamp: number) => {
    return `${timestampToDateString(timestamp)}  ${timestampToHMString(timestamp)} 提交`;
  }

  const handleReplyTextState = (pass) => {
    if (pass === 0) {
      return "未处理";
    } else if (pass === 1) {
      return "已通过";
    } else if (pass === 2) {
      return "未通过";
    }
  }


  console.log(TicketAppealData);
  return (
    <View className={styles.wrapper}>
      <Text className={styles.title}>{title}</Text>
      <Text className={styles.time}>{handelTimeToText(TicketAppealData.registration_time)}</Text>
      <View className={`${TicketAppealData.pass === 2?styles.colorUnpass:styles.colorPass} ${styles.replyState}`}>
        {handleReplyTextState(TicketAppealData.pass)}
      </View>
    </View>
  )
}
export default AppealTicket;