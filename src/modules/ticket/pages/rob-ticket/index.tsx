import React from "react";
import { useContainer } from "unstated-next";
import { navigateBack } from "@tarojs/taro";
import { View } from "@tarojs/components";
import dayjs from "dayjs";
import {
  useQuery,
  useMutation,
  useQueryCache,
} from "react-query/dist/react-query.production.min";

import PopupContext from "@/stores/popup";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import robSuccessImg from "@/static/images/rob-success.png";
import error from "@/static/images/error.png";

import Empty from "@/common/components/empty";
import { getRobTicketListInfo, robTicket } from "../../services";
import Ticket from "../../components/ticket";
import styles from "./index.module.scss";

const PAGE_TITLE = "在线抢票";

const RobTicket = () => {
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

  const handleRobTicket = async (id: number) => {
    const res = await mutateRobTicket(id);
    if (res.status === 10000) {
      Popup.show({
        img: robSuccessImg,
        title: "恭喜您！抢票成功！",
        detail: "电影票卡卷已存入“我的”页面”我的影票“中！",
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
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      {ticketList.data.map((e) => (
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
      ))}
      <Popup.Comp />
    </View>
  );
};

export default RobTicket;
