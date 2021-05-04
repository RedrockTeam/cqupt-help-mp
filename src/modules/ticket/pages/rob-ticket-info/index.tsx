/*
 * @Author: myjdml
 * @Date: 2021-03-23 20:08:09
 * @LastEditors: myjdml
 * @LastEditTime: 2021-04-18 16:44:38
 * @FilePath: \cqupt-help-mp\src\modules\ticket\pages\rob-ticket-info\index.tsx
 * @Description: nothing is everything
 */
import React, { useState } from 'react';
import styles from "./index.module.scss";
import NavBack from '@/common/components/nav-back';
import { View, Image, Text, Button } from '@tarojs/components';
import {
  useQuery,
  useMutation,
  useQueryCache,
} from "react-query/dist/react-query.production.min";
import { getRobTicketListInfo, robAlternateTicket, robTicket } from '../../services';
import PopupContext from "@/stores/popup";
import { useContainer } from 'unstated-next';
import error from "@/static/images/error.png";
import robSuccessImg from "@/static/images/rob-success.png";
import Placeholder from "@/common/components/placeholder";
import { getCurrentInstance, navigateBack } from '@tarojs/taro';
import Empty from "@/common/components/empty";
import ticketList from "../../../../mock/TicketList.json";
import dayjs from 'dayjs';
import { now, timestampToTimeStreamString } from '@/common/helpers/date';
import PrimaryButton from '@/common/components/primary-button';

const PAGE_TITLE = "在线抢票";

const RobTicketInfo = () => {
  const [ ticketId, setTicketId ] = useState<number>(Number(getCurrentInstance().router?.params.id));
  // const [ ticketInfo, setTicketInfo ] = useState();
  const [ params, setParams ] = useState(getCurrentInstance().router?.params);
  
  const Popup = useContainer(PopupContext);
  const queryCache = useQueryCache();

  const { data: ticketList, isLoading, isError } = useQuery(
    "robTicketListInfo",
    getRobTicketListInfo,
    {
      refetchInterval: 2000,
      onSuccess: (data) => {
        // 测试修改
      }
    }
  );
  const ticketInfo = ticketList?.data.filter(res => res.id === ticketId)[0];
  if (ticketInfo === undefined) return;
  // const isLoading = false;
  // const isError = false;

  const [isRobing, setIsRobing] = useState(false);
  const [isAlternateRobing, setIsAlternateRobing] = useState(false);
  const [mutateRobTicket] = useMutation(robTicket, {
    onSuccess: () => queryCache.invalidateQueries("robTicketListInfo"),
  });
  const [mutateRobAlternateTicket] = useMutation(robAlternateTicket, {
    onSuccess: () => queryCache.invalidateQueries("robTicketListInfo"),
  });

  const handleRobTicket = async (id: number) => {
    let res: any;
    if (!isRobing) {
      setIsRobing(true);
      res = await mutateRobTicket(id);
      setIsRobing(false);
    } else {
      return;
    }
    // const item = ticketList.data.filter((item) => item.id === id)[0];
    if (res.status === 10000) {
      const hide = Popup.show({
        img: robSuccessImg,
        title: "恭喜您！抢票成功！",
        detail: `电影票卡券已存入“我的影票”中赶快去看看吧！`,
      });
      setTimeout(() => hide(), 10000);
    } else {
      let detail: string;
      if (res.status === 10004) {
        detail = "票已经被抢完了";
      } else if (res.status === 10005) {
        detail = "您已抢到票";
      } else if (res.status === 10006) {
        detail = "请求超时,请重试";
      } else if (res.status === 10007) {
        detail = "请求过于频繁";
      } else if (res.status === 10008) {
        detail = "客户端错误,请稍后再试";
      } else if (res.status === 10010) {
        detail = "由于您过往观影活动存在不良信用记录，本次抢票时间延后五分钟。";
      } else {
        detail = "出错了...";
      }
      const hide = Popup.show({
        img: error,
        title: "抢票失败...",
        detail,
      });
      setTimeout(() => hide(), 1500);
    }
  };
  const handleAlternateRobTicket = async (id: number, re_send_num: number) => {
    let res: any;
    if (!isAlternateRobing) {
      setIsAlternateRobing(true);
      res = await mutateRobAlternateTicket(id);
      setIsAlternateRobing(false);
    } else {
      return;
    }
    console.log(res);
    
    if (res.status === 10000) {
      const hide = Popup.show({
        img: robSuccessImg,
        title: "恭喜您！候补成功！",
        detail: `目前您排在第${re_send_num}位。候补结果将通过重邮小帮手通知`,
      });
      setTimeout(() => hide(), 10000);
    } else {
      let detail: string;
      if (res.status === 10004) {
        detail = "票已经被抢完了";
      } else if (res.status === 10006) {
        detail = "请求超时,请重试";
      } else if (res.status === 10005) {
        detail = "您已抢到票";
      } else if (res.status === 10007) {
        detail = "请求过于频繁";
      } else if (res.status === 10008) {
        detail = "客户端错误,请稍后再试";
      } else if (res.status === 10010) {
        detail = "由于您过往观影活动存在不良信用记录，本次抢票时间延后五分钟。";
      } else {
        detail = "出错了...";
      }
      const hide = Popup.show({
        img: error,
        title: "抢票失败...",
        detail,
      });
      setTimeout(() => hide(), 1500);
    }
  }

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !ticketList) return <Placeholder title={PAGE_TITLE} isError />;
  if (ticketList.data.length === 0)
    return (
      <Empty
        title={PAGE_TITLE}
        detail="近期还没有影票可以抢哦～"
        suggestion="去首页看看活动吧"
        btnContent="查看活动"
        onBtnClick={() => navigateBack()}
      />
    );

  const renderRobBtn = () => {
    const nowTimestamp = now();
    if (ticketInfo?.is_received)
      return (
        <PrimaryButton disabled className={styles.btn}>
          您已抢票成功
        </PrimaryButton>
      );

    if (nowTimestamp >= dayjs(ticketInfo?.begin_time).unix() && dayjs(ticketInfo?.play_time).unix() >= nowTimestamp) {
      if (ticketInfo?.left <= 0) {
        if (ticketInfo?.re_send_num < Math.ceil(ticketInfo?.all*0.2)) {
          return (
            <PrimaryButton className={styles.btn} onClick={() => handleAlternateRobTicket(ticketInfo.id, ticketInfo.re_send_num)}>
              候补抢票
            </PrimaryButton>
          )
        }
        return (
          <PrimaryButton disabled className={styles.btn}>
            已抢完
          </PrimaryButton>
        );
      }
      return (
        <PrimaryButton className={styles.btn} onClick={() => handleRobTicket(ticketInfo.id)}>
          立即抢票
        </PrimaryButton>
      );
    }
    if (nowTimestamp > dayjs(ticketInfo?.play_time).unix()) {
      return (
        <PrimaryButton disabled className={styles.btn}>
          已失效
        </PrimaryButton>
      );
    }
    if (dayjs(ticketInfo?.begin_time).unix() > nowTimestamp) {
      const leftTime = Math.ceil((dayjs(ticketInfo?.begin_time).unix() - nowTimestamp) / 60);
      if (leftTime < 120) {
        return (
          <PrimaryButton disabled className={styles.btn}>
            距离抢票还有 {leftTime} min
          </PrimaryButton>
        );
      }
      return (
        <PrimaryButton disabled className={styles.btn}>
          等待开抢
        </PrimaryButton>
      );
    }
  };
  
  if (ticketInfo === undefined) {
    return;
  }
  return (
    <View className={styles.robTicketInfo}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      <Image 
        src={ticketInfo.image}
        className={styles.previewImage}
      ></Image>
      {/* <View className={styles.placeholder}></View> */}
      <View className={styles.content}>
        <View className={styles.header}></View>
        <View className={styles.title}>{ticketInfo.name}</View>
        <View className={styles.text}>
          <Text>活动时间：</Text>
          <Text>{timestampToTimeStreamString(dayjs(ticketInfo.begin_time).unix(), dayjs(ticketInfo.end_time).unix())}</Text>
        </View>
        <View className={styles.text}>
          <Text>活动地点：</Text>
          <Text>{ticketInfo.location}</Text>
        </View>
        <View className={styles.text}>
          <Text>主讲人：</Text>
          <Text>{ticketInfo.chief}</Text>
        </View>
      </View>

      <View className={styles.introduction}>
        <View className={styles.introductionItem}>
          <View className={styles.title}>讲座简介</View>
          <View className={styles.body}>
            {ticketInfo.introduction}
          </View>
        </View>
        <View className={styles.introductionItem}>
          <View className={styles.title}>参与须知</View>
          <View className={styles.body}>
            <Text>
              {`1：本次线上影票仅面向重庆邮电大学师生，为公益性活动，禁止以牟利为目的的影票倒卖活动，一经发现，将被记入不良信用档案。
              2：如有特殊情况，不能到场者。请在开场前半个小时，进入“我的影票”页面，选择“我要退票”，退回自己的影票。
              3：若开场半个小时后，仍未验票入场，该票失效，同时您将被记入不良信用档案。
              4.影票发完后自动进入候补录入阶段，参与候补的用户也有机会获得影票。
              5.候补票用户与正常抢票用户一致，遵守信用制等相关规定。获得候补票后未按时到场验票，也将被记录至不良信用档案。`}
            </Text>
          </View>
        </View>
      </View>
      <View className={styles.btnCover}>
        {renderRobBtn()}
      </View>
      <Popup.Comp />
    </View>
  )
}

export default RobTicketInfo;