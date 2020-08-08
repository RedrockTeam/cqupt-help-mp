import React from "react";
import { View, Swiper, SwiperItem } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import PrimaryButton from "@/common/components/primary-button";
import { useQuery } from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import { redirectTo } from "@tarojs/taro";
import Empty from "@/common/components/empty";
import { resolvePage } from "@/common/helpers/utils";
import styles from "./index.module.scss";
import OwedTicket from "../../components/owed-ticket";
import { getMyTicketList } from "../../services";

const PAGE_TITLE = "我的影票";

const MyTicket = () => {
  const { data: myTicketListRes, isLoading, isError } = useQuery(
    "getMyTiketList",
    getMyTicketList
  );
  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError) return <Placeholder title={PAGE_TITLE} isError />;
  if (myTicketListRes?.data.length === 0)
    return (
      <Empty
        title={PAGE_TITLE}
        detail="影票空空如也哦～"
        suggestion="快去抢票吧"
        btnContent="查看抢票"
        onBtnClick={() =>
          redirectTo({ url: resolvePage("ticket", "rob-ticket") })
        }
      />
    );
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
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
