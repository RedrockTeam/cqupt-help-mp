import NavBack from '@/common/components/nav-back';
import { Button, View } from '@tarojs/components';
import React, { useState } from 'react';
import { useQuery, useQueryCache } from 'react-query/dist/react-query.production.min';
import ReplyTicket from '../../components/reply-ticket';
import { getTicketAppealList } from '../../services';
import styles from './index.module.scss';
import TicketAppealList from '@/mock/TicketAppealList.json';
import { navTo, resolvePage } from '@/common/helpers/utils';

const PAGE_TITLE = "申诉结果";

const TicketAppealResult = () => {


  // const { data: TicketAppealList , isLoading, isError } = useQuery(
  //   "getTicketAppealList",
  //   getTicketAppealList
  // );
  const isLoading = false;
  const isError = false;
  const queryCache = useQueryCache();

  const TicketAppealListLength = TicketAppealList.data.length;

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F5F6F9" />
      {
        TicketAppealList.data.map((item, index) => {
          return(
            <ReplyTicket
              key={index}
              reply={item.reply}
            />
          )
        })
      }
      <Button 
        className={styles.replyBtn}
        onClick={() => {navTo({ url: `${resolvePage("ticket-appeal", "index")}` })}}
      >再次申诉</Button>
    </View>
  )
}
export default TicketAppealResult;

