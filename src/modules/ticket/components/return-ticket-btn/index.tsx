/*
 * @Author: myjdml
 * @Date: 2021-04-07 21:53:20
 * @LastEditTime: 2021-04-09 20:22:22
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: /cqupt-help-mp/src/modules/ticket/components/return-ticket-btn/index.tsx
 * 
 */
import { Button, View } from '@tarojs/components';
import React, { useState } from 'react';
import SelectPopup from '../select-popup';
import styles from './index.module.scss';

type Props = {
  PopupState: any;
}

const ReturnTicketBtn = ({
  PopupState
}) => {
  const [ btnText, setBtnText ] = useState("申请退票");
  
  return (
    <View className={styles.cover}>
      <Button 
        className={styles.btn}
        onClick={PopupState.changePopupState}
      >{btnText}</Button>

      {/* <SelectPopup
        isShow={PopupState.popupState}
        title="退票说明"
        detail={`1.距离开场半个小时以内将不支持退票，若未退票且未观影者，将被计入不良信用档案。
          2.规定时间内退票不会对您的信用度造成任何影响。
        `}
        bottomType={2}
        confirmFun={changePopupState}
      /> */}

    </View>
  )
}

export default ReturnTicketBtn;