/*
 * @Author: myjdml
 * @Date: 2021-03-23 20:08:09
 * @LastEditors: myjdml
 * @LastEditTime: 2021-03-23 20:15:27
 * @FilePath: /cqupt-help-mp/src/modules/ticket/pages/rob-tickit-info/index.tsx
 * @Description: nothing is everything
 */
import React, { useState } from 'react';
import styles from "./indec.module.scss";
import NavBack from '@/common/components/nav-back';
import { View } from '@tarojs/components';

const PAGE_TITLE = "在线抢票";

const RobTicketInfo = () => {


  return (
    <View>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
    </View>
  )
}

export default RobTicketInfo;