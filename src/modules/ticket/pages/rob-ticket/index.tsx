import React from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Ticket from "../../components/ticket";
import styles from "./index.module.scss";

const ticketList = [
  {
    playTime: 1687484800,
    robTime: 1595874800,
    location: "红岩网校工作站",
    remain: 200,
    image: "http://img.zhengyua.cn/img/20200413190823.png",
    name: "爱情公寓12345",
    isReceived: false,
  },
  {
    playTime: 1587484800,
    robTime: 1595779610,
    location: "红岩网校工作站",
    remain: 200,
    image: "http://img.zhengyua.cn/img/20200413190823.png",
    name: "爱情公寓1234",
    isReceived: false,
  },
  {
    playTime: 1587484800,
    robTime: 1595779610,
    location: "红岩网校工作站",
    remain: 200,
    image: "http://img.zhengyua.cn/img/20200413190823.png",
    name: "爱情公寓123",
    isReceived: false,
  },
  {
    playTime: 1587484800,
    robTime: 1587312000,
    location: "红岩网校工作站",
    remain: 0,
    image: "http://img.zhengyua.cn/img/20200413190823.png",
    name: "爱情公寓12",
    isReceived: false,
  },
  {
    playTime: 1587484800,
    robTime: 1587312000,
    location: "红岩网校工作站",
    remain: 200,
    image: "http://img.zhengyua.cn/img/20200413190823.png",
    name: "爱情公寓1",
    isReceived: false,
  },
];

const RobTicket = () => {
  return (
    <View className={styles.wrapper}>
      <NavBack title="我的奖品" background="#F6F6F9" />
      {ticketList.length &&
        ticketList.map((e) => <Ticket {...e} key={e.name} />)}
    </View>
  );
};

export default RobTicket;
