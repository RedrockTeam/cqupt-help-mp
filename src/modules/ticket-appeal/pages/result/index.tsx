import NavBack from '@/common/components/nav-back';
import { Button, Image, Text, View } from '@tarojs/components';
import React, { useState } from 'react';
import { useQuery, useQueryCache } from 'react-query/dist/react-query.production.min';
import ReplyTicket from '../../components/reply-ticket';
import { getTicketAppealList } from '../../services';
import styles from './index.module.scss';
import TicketAppealList from '@/mock/TicketAppealList.json';
import { navTo, resolvePage } from '@/common/helpers/utils';
import { getCurrentInstance } from '@tarojs/taro';
import FeedBackImg from '@/static/images/feedback.png';

const PAGE_TITLE = "申诉结果";

const TicketAppealResult = () => {
  const [ params, setParams ] = useState(getCurrentInstance().router?.params);
  const pass: string = "2";
  const reply: string = "我没错"


  // const { data: TicketAppealList , isLoading, isError } = useQuery(
  //   "getTicketAppealList",
  //   getTicketAppealList
  // );
  // const isLoading = false;
  // const isError = false;
  // const queryCache = useQueryCache();

  // const TicketAppealListLength = TicketAppealList.data.length;
  if (params?.pass === "1") {
    return (
      <View>
        <NavBack title={PAGE_TITLE} background="#F5F6F9" />
        <View className={styles.successPass}>
          <Image style={{height: '212.3px', width: '182.6px'}} src={FeedBackImg}></Image>
          <Text className={styles.title}>申诉成功，已撤销信用记录啦~</Text>
        </View>
      </View>
    )
    
  }

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F5F6F9" />
      {/* {
        TicketAppealList.data.map((item, index) => {
          return(
            <ReplyTicket
              key={index}
              reply={item.reply}
            />
          )
        })
      } */}
      <ReplyTicket
        reply={params?.reply}
      />
      <Button
        className={styles.replyBtn}
        onClick={() => {navTo({ url: `${resolvePage("ticket-appeal", "index")}` })}}
      >再次申诉</Button>
    </View>
  )
}
export default TicketAppealResult;

