import React, { useState } from "react";
import {
  View,
  Swiper,
  SwiperItem,
  BaseEventOrigFunction,
} from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import PrimaryButton from "@/common/components/primary-button";
import {
  useQuery,
  useMutation,
  useQueryCache,
} from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import { redirectTo, showActionSheet } from "@tarojs/taro";
import Empty from "@/common/components/empty";
import { resolvePage } from "@/common/helpers/utils";
import { SwiperProps } from "@tarojs/components/types/Swiper";
import styles from "./index.module.scss";
import OwedTicket from "../../components/owed-ticket";
import { getMyTicketList, checkTicket } from "../../services";

const PAGE_TITLE = "我的影票";

const MyTicket = () => {
  const { data: myTicketListRes, isLoading, isError } = useQuery(
    "getMyTiketList",
    getMyTicketList
  );
  const queryCache = useQueryCache();
  const [mutateCheckTicket] = useMutation(checkTicket, {
    onSuccess: () => queryCache.invalidateQueries("getMyTiketList"),
  });
  const handleCheck = async () => {
    const res = await showActionSheet({
      itemList: ["确定"],
      fail(e) {
        console.log(e);
      },
    });
    if (res.tapIndex === 0) {
      if (!myTicketListRes) return;
      await mutateCheckTicket(myTicketListRes.data[current].id);
    }
  };
  const [current, setCurrent] = useState(0);
  const handleSwiperChange: BaseEventOrigFunction<SwiperProps.onChangeEventDeatil> = (
    e
  ) => setCurrent(e.detail.current);

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !myTicketListRes)
    return <Placeholder title={PAGE_TITLE} isError />;
  if (myTicketListRes.data.length === 0)
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
        onChange={handleSwiperChange}
      >
        {myTicketListRes.data.map((e) => (
          <SwiperItem key={e.id}>
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
      <PrimaryButton onClick={handleCheck} className={styles.btn}>
        点击验票
      </PrimaryButton>
    </View>
  );
};

export default MyTicket;
