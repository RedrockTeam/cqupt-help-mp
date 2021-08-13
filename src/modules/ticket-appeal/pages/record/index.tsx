/*
 * @Author: myjdml
 * @Date: 2021-04-15 09:42:21
 * @LastEditTime: 2021-04-15 15:33:45
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: \cqupt-help-mp\src\modules\ticket-appeal\pages\record\index.tsx
 * 
 */
import { Image, View } from '@tarojs/components';
import React, { useState } from 'react';
import styles from './index.module.scss';
import NavBack from '@/common/components/nav-back';
import Empty from "@/common/components/empty";
import AppealTicket from '../../components/appeal-ticket';
// import TicketAppealList from '@/mock/TicketAppealList.json';
import { getTicketAppealList } from '../../services';
import { useQuery, useQueryCache } from 'react-query/dist/react-query.production.min';
import Placeholder from '@/common/components/placeholder';
import { getCurrentInstance } from '@tarojs/taro';

const PAGE_TITLE = "申诉记录";

const TicketAppealRecord = () => {
  const [ params, setParams ] = useState(getCurrentInstance().router?.params);
  const [currentList, setCurrentList] = useState([])

  const { data: TicketAppealList , isLoading, isError } = useQuery(
    "getTicketAppealList",
    getTicketAppealList
  );
  // const isLoading = false;
  // const isError = false;
  const queryCache = useQueryCache();

  if (TicketAppealList !== undefined) {
    TicketAppealList.data = TicketAppealList.data.filter(res => res.film_name === params.product_name);
  }

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !TicketAppealList) return <Placeholder title={PAGE_TITLE} isError />;

  const TicketAppealListLength = TicketAppealList.data.length;
  if (TicketAppealListLength === 0) {
    return (
      <View>
        <View style={{height: 120, backgroundColor: 'white'}}></View>
        <Empty
          title={PAGE_TITLE}
          detail="暂无任何申诉记录哦~"
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
        TicketAppealList.data.map((item, index) => {
          return(
            <AppealTicket 
              key={index}
              TicketAppealData={item}
            />
          )
        })
      }
    </View>
  )
}
export default TicketAppealRecord;