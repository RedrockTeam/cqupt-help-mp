/*
 * @Author: myjdml
 * @Date: 2021-03-23 20:08:09
 * @LastEditors: myjdml
 * @LastEditTime: 2021-03-23 20:15:27
 * @FilePath: /cqupt-help-mp/src/modules/ticket/pages/rob-tickit-info/index.tsx
 * @Description: nothing is everything
 */
import React, { useState } from 'react';
import styles from "./index.module.scss";
import NavBack from '@/common/components/nav-back';
import { View } from '@tarojs/components';
import {
  useQuery,
  useMutation,
  useQueryCache,
} from "react-query/dist/react-query.production.min";
import { getRobTicketListInfo, robTicket } from '../../services';
import PopupContext from "@/stores/popup";
import { useContainer } from 'unstated-next';
import error from "@/static/images/error.png";
import robSuccessImg from "@/static/images/rob-success.png";
import Placeholder from "@/common/components/placeholder";
import { navigateBack } from '@tarojs/taro';
import Empty from "@/common/components/empty";

const PAGE_TITLE = "在线抢票";

const RobTicketInfo = () => {
  const Popup = useContainer(PopupContext);
  const queryCache = useQueryCache();

  const { data: ticketList, isLoading, isError } = useQuery(
    "robTicketListInfo",
    getRobTicketListInfo,
    {
      refetchInterval: 2000,
    }
  );

  const [mutateRobTicket] = useMutation(robTicket, {
    onSuccess: () => queryCache.invalidateQueries("robTicketListInfo"),
  });

  const [isRobing, setIsRobing] = useState(false);

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
      } else if (res.status === 10006) {
        detail = "请求超时,请重试";
      } else if (res.status === 10007) {
        detail = "请求过于频繁";
      } else if (res.status === 10008) {
        detail = "客户端错误,请稍后再试";
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

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  // console.log(ticketList);
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

  return (
    <View className={styles.robTicketInfo}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
       <View>抢票</View>
    </View>
  )
}

export default RobTicketInfo;