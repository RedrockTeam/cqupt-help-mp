import { Image, Text, View } from '@tarojs/components';
import React, { useState } from 'react';
import styles from './index.module.scss';
import NavBack from '@/common/components/nav-back';
import Empty from "@/common/components/empty";
import AppealTicket from '../../components/appeal-ticket';
// import MyBlackList from '@/mock/MyBlackList.json';
import { getMyBlackList } from '../../services';
import { useQuery, useQueryCache } from 'react-query/dist/react-query.production.min';
import Placeholder from '@/common/components/placeholder';
import { navTo, resolvePage } from '@/common/helpers/utils';

const PAGE_TITLE = "影票申诉";

const TicketHomeList = () => {

  const { data: MyBlackList , isLoading, isError } = useQuery(
    "getMyBlackList",
    getMyBlackList
  );
  // const isLoading = false;
  // const isError = false;
  const queryCache = useQueryCache();
  

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  // console.log(ticketList);
  if (isError || !MyBlackList) return <Placeholder title={PAGE_TITLE} isError />;

  const MyBlackListLength = MyBlackList.data.length;
  if (MyBlackListLength === 0) {
    return (
      <View>
        <View style={{height: 120, backgroundColor: 'white'}}></View>
        <Empty
          title={PAGE_TITLE}
          detail="您的信用良好，暂无失信记录，继续保持哦~"
          btnContent=""
        />
      </View>
    )
  }
  
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F5F6F9" />
      {/* <Image src={}></Image> */}
      {
       MyBlackList.data.map((item, index) => {
          return(
            <View className={styles.card} key={index}>
              <Text className={styles.title}>{item.product_name}
                <Text className={styles.tip}>(失信观影)</Text>
              </Text>
              <View 
                className={styles.appeal}
                onClick={() => navTo({ url: `${resolvePage("ticket-appeal", "index")}?product_id=${item.product_id}&product_name=${item.product_name}` })}
              >去申诉</View>
            </View>
          )
        })
      }
    </View>
  )
}
export default TicketHomeList;