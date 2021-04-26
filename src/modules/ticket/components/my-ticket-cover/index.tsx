import { Image, View } from '@tarojs/components';
import React, { useState } from 'react';
import styles from './index.modules.scss';
import TicketPass from '@/static/images/ticket-pass.png';

type Props = {
  ticketState: boolean;
}

const MyTicketCover = ({
  ticketState,
}) => {
  if (ticketState) {
    return <View></View>;
  }

  return (
    <View className={styles.wrapper}>
      <Image src={TicketPass} className={styles.image}></Image>
    </View>
  )
}
export default MyTicketCover;