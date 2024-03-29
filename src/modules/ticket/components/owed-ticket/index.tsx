/*
 * @Author: myjdml
 * @Date: 2021-03-23 22:51:42
 * @LastEditTime: 2021-04-09 20:16:55
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: /cqupt-help-mp/src/modules/ticket/components/owed-ticket/index.tsx
 * 
 */
import React, { useMemo, useState } from "react";
import { View, Image, Text, Button } from "@tarojs/components";
import { Barcode, QRCode } from 'taro-code';
import styles from "./index.module.scss";
import { API } from "@/common/constants";
import SelectPopup from "../select-popup";
import ReturnTicketBtn from "../return-ticket-btn";
import SelectPopupContext from "@/stores/select-popup";
import MyTicketCover from "../my-ticket-cover";

type Props = {
  name: string;
  img: string;
  location: string;
  time: string;
  id: number;
  type: number;
  sequence: number;
  stu_num: string;
  PopupStateCounter: any;
  effective: 1 | 2 | 3;
};

const OwedTicket = ({ 
  name,
  img,
  location,
  time,
  id,
  type,
  sequence,
  stu_num,
  PopupStateCounter,
  effective,
}: Props) => {
  const [ ticketState, setTicketState ] = useState<number>(effective);
  useMemo(() => setTicketState(effective), [effective]);

  const countTicketNum = () => {
    let typeNum,sessionNum,orderNum;
    if (type === 0) {
      typeNum = 2;
    } else if (type === 1) {
      typeNum = 1;
    }

    if (id.toString().length < 2) {
      sessionNum = `0${id.toString()}`;
    } else {
      sessionNum = id.toString();
    }

    orderNum = sequence.toString();
    if (sequence.toString().length === 1) {
      orderNum = "000" + orderNum;
    } else if (sequence.toString().length === 2) {
      orderNum = "00" + orderNum;
    } else if (sequence.toString().length === 3) {
      orderNum = "0" + orderNum;
    }
    
    return `${typeNum}${sessionNum}${orderNum}`;
  }
  // const num = 12;
  
  
  
  return (
    <View className={styles.itemWrapper}>
      <View className={styles.top}>
        <View className={styles.introduction}>
          <View className={styles.title}>{name}</View>
          <View className={styles.tip} >请全程佩戴口罩</View>
          <View className={styles.type}>影票类型：标准票</View>
        </View>
        <Image src={img} className={styles.img} mode="aspectFill" />
        <View className={styles.lineText}>请在开场半小时内扫码入场</View>
      </View>
      <View className={styles.bottom}>
        <Text className={styles.subtitle}>放映地点:</Text>
        <Text className={styles.content}>{location}</Text>
        <Text className={styles.subtitle}>放映时间:</Text>
        <Text className={styles.content}>{time}</Text>
        <View className={styles.code}>
          <QRCode
            text={`${API}/updateEffective?stu_num=${stu_num}&product_id=${id}`}
            size={130}
            scale={4}
            errorCorrectLevel='M'
            typeNumber={2}
          />
          <View className={styles.ticketNumber}>票码编号：{countTicketNum()}</View>
        </View>
        <View className={styles.line}></View>

        <ReturnTicketBtn
          PopupStateCounter={PopupStateCounter}
        ></ReturnTicketBtn>

        <MyTicketCover
          ticketState={ticketState}
        ></MyTicketCover>
      </View>

      {/* <ReturnTicketBtn></ReturnTicketBtn> */}
    </View>
  );
};

export default OwedTicket;
