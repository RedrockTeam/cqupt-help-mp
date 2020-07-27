import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Popup from "@/common/components/popup";
import robSuccessImg from "@/static/images/rob-success.png";
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
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsShow(false), 3000);
  }, [isShow]);
  const handleRobTicket = () => {
    // TODO: 抢票 request
    // TODO: 刷新电影列表 request
    setIsShow(true);
  };
  return (
    <View className={styles.wrapper}>
      <NavBack title="在线抢票" background="#F6F6F9" />
      {ticketList.length &&
        ticketList.map((e) => (
          <Ticket {...e} onRobTicket={handleRobTicket} key={e.name} />
        ))}
      <Popup
        img={robSuccessImg}
        isShow={isShow}
        title="恭喜您！抢票成功！"
        detail="电影票卡卷已存入“我的”页面‘我的影票’中。赶紧去领电影票吧!"
      />
    </View>
  );
};

export default RobTicket;
