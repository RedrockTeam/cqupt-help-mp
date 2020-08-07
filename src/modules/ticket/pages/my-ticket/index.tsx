import React from "react";
import { View, Swiper, SwiperItem } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import PrimaryButton from "@/common/components/primary-button";
import { useQuery } from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import styles from "./index.module.scss";
import OwedTicket from "../../components/owed-ticket";
import { getMyTicketList } from "../../services";

const MyTicket = () => {
  const { data: myTicketListRes, isLoading, isError } = useQuery(
    "getMyTiketList",
    getMyTicketList
  );
  if (isLoading) return <Placeholder title="我的影皮" />;
  if (isError) return <Placeholder title="我的影票" isError />;
  return (
    <View className={styles.wrapper}>
      <NavBack title="我的影票" background="#F6F6F9" />
      <Swiper
        className={styles.swiper}
        indicatorColor="#A7A3FF"
        indicatorActiveColor="#625AF8"
        indicatorDots
      >
        {myTicketListRes?.data.map((e) => (
          <SwiperItem key={e.name}>
            <OwedTicket
              img={e.image}
              name={e.name}
              location={e.location}
              time={e.play_time}
              key={e.name}
            />
          </SwiperItem>
        ))}
      </Swiper>
      <PrimaryButton className={styles.btn}>点击验票</PrimaryButton>
    </View>
  );
};

export default MyTicket;
