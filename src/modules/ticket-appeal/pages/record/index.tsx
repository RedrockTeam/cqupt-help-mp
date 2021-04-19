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
import Empty from "@/static/images/empty.png";
import NavBack from '@/common/components/nav-back';
import AppealTicket from '../../components/appeal-ticket';
import TicketAppealList from '@/mock/TicketAppealList.json';

const PAGE_TITLE = "申诉记录";

const TicketAppealResult = () => {

  console.log(TicketAppealList);
  
  
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
export default TicketAppealResult;