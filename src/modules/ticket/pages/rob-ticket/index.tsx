import React, { useState, useEffect } from "react";
import { navigateBack, request } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import dayjs from "dayjs";
import { useQuery } from "react-query/dist/react-query.production.min";

import NavBack from "@/common/components/nav-back";
import Popup from "@/common/components/popup";
import Loading from "@/common/components/loading";
import PrimaryButton from "@/common/components/primary-button";

import robSuccessImg from "@/static/images/rob-success.png";
import emptyImg from "@/static/images/empty.png";
import { API } from "@/common/constants";
import Ticket from "../../components/ticket";
import styles from "./index.module.scss";
import { useRobTicketListInfo, robTicket } from "../../services";

const RobTicket = () => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (isShow === true) {
      setTimeout(() => setIsShow(false), 3000);
    }
  }, [isShow]);

  // const { data: ticketList } = useRobTicketListInfo();
  const { data: ticketList } = useQuery(
    "/cyb-secondKill/secKillInfo",
    () =>
      request({
        url: `${API}/cyb-secondKill/secKillInfo`,
        method: "POST",
      }).then((res) => res.data),
    {
      refetchInterval: 2000,
    }
  );
  const handleRobTicket = async (id: number) => {
    const res = await robTicket(id);
    if (res.data.status === 10000) {
      setIsShow(true);
    } else {
      // handle
    }
  };
  console.log(ticketList);
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
      <Popup
        img={robSuccessImg}
        isShow={isShow}
        title="恭喜您！抢票成功！"
        detail="电影票卡卷已存入“我的”页面”我的影票“中。赶紧去领电影票吧!"
      />
    </View>
  );
};

RobTicket.whyDidYouRender = true;

export default RobTicket;
