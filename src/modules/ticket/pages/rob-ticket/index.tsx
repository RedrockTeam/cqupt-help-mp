import React from "react";
import { useContainer } from "unstated-next";
import { navigateBack } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import dayjs from "dayjs";
import { useQuery } from "react-query/dist/react-query.production.min";

import PopupContext from "@/stores/popup";
import NavBack from "@/common/components/nav-back";
import Loading from "@/common/components/placeholder";
import PrimaryButton from "@/common/components/primary-button";
import robSuccessImg from "@/static/images/rob-success.png";
import error from "@/static/images/error.png";
import emptyImg from "@/static/images/empty.png";

import { getRobTicketListInfo, robTicket } from "../../services";
import Ticket from "../../components/ticket";
import styles from "./index.module.scss";

const RobTicket = () => {
  const Popup = useContainer(PopupContext);

  const { data: ticketList } = useQuery(
    "robTicketListInfo",
    getRobTicketListInfo,
    {
      refetchInterval: 2000,
    }
  );

  const handleRobTicket = async (id: number) => {
    const res = await robTicket(id);
    if (res.status === 10000) {
      Popup.show({
        img: robSuccessImg,
        title: "恭喜您！抢票成功！",
        detail: "电影票卡卷已存入“我的”页面”我的影票“中。赶紧去领电影票吧!",
      });
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
      Popup.show({
        img: error,
        title: "抢票失败...",
        detail,
      });
    }
  };

  if (!ticketList) {
    return (
      <View className={styles.emptyWrapper}>
        <NavBack title="在线抢票" background="#F6F6F9" />
        <Loading />
      </View>
    );
  }
  if (ticketList && ticketList.data.length === 0) {
    return (
      <View className={styles.emptyWrapper}>
        <NavBack title="在线抢票" background="#FFFFFF" />
        <Image src={emptyImg} className={styles.img} />
        <Text className={styles.text}>目前还没有影票哦~</Text>
        <Text className={styles.text}>去看看其他活动吧</Text>
        <PrimaryButton className={styles.btn} onClick={() => navigateBack()}>
          查看活动
        </PrimaryButton>
      </View>
    );
  }
  return (
    <View className={styles.wrapper}>
      <NavBack title="在线抢票" background="#F6F6F9" />
      {ticketList
        ? ticketList.data.map((e) => (
            <Ticket
              id={e.id}
              playTime={dayjs(e.play_time).unix()}
              robTime={dayjs(e.begin_time).unix()}
              location={e.location}
              remain={e.left}
              image={e.image}
              name={e.name}
              isReceived={e.is_received}
              onRobTicket={handleRobTicket}
              key={e.id}
            />
          ))
        : null}
      <Popup.Comp />
    </View>
  );
};

export default RobTicket;
