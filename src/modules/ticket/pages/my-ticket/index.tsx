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
import { redirectTo } from "@tarojs/taro";
import { now } from "@/common/helpers/date";
import dayjs from "dayjs";
import Empty from "@/common/components/empty";
import { resolvePage } from "@/common/helpers/utils";
import { SwiperProps } from "@tarojs/components/types/Swiper";
import PopupContext from "@/stores/popup";
import robSuccessImg from "@/static/images/rob-success.png";
import error from "@/static/images/error.png";
import { createContainer, useContainer } from "unstated-next";
import BottomPop from "@/common/components/bottomPop";
import styles from "./index.module.scss";
import OwedTicket from "../../components/owed-ticket";
import { 
  getMyTicketList, 
  checkTicket,
  returnMyTicket,
} from "../../services";
import myTicketListRes from "../../../../mock/myTicketListRes.json";
import SelectPopup from "../../components/select-popup";
import SelectPopupContext from "@/stores/select-popup";

const PAGE_TITLE = "我的影票";
const MyTicket = () => {
  // 控制退票弹窗
  const [ popupState, setPopupState ] = useState(false);
  const changePopupState = () => {
    PopupState.setPopupState(!PopupState.popupState);
  }
  const PopupState = {
    popupState,
    setPopupState,
    changePopupState
  }

  // SelectPopup退票函数
  const handelReturnTicket = () => {
    console.log("开始退票");
    returnMyTicket()
  }

  const Popup = useContainer(PopupContext);
  // const { data: myTicketListRes, isLoading, isError } = useQuery(
  //   "getMyTiketList",
  //   getMyTicketList
  // );
  const isLoading = false;
  const isError = false;
  const queryCache = useQueryCache();
  const [visible, setVisible] = useState(false);
  const handleConcel = () => {
    setVisible(false);
  };
  const handleOk = async () => {
    setVisible(false);
    if (!myTicketListRes) return;
    try {
      const res = await mutateCheckTicket(myTicketListRes.data[current].id);
      if (res.status === 200) {
        // 憨批后端
        const hide = Popup.show({
          img: robSuccessImg,
          title: "恭喜您！验票成功！",
          detail: "快去看电影吧～",
        });
        setTimeout(() => hide(), 1500);
      } else {
        const hide = Popup.show({
          img: error,
          title: "验票失败...",
          detail: "错误",
        });
        setTimeout(() => hide(), 1500);
      }
    } catch (e) {
      const hide = Popup.show({
        img: error,
        title: "验票失败...",
        detail: "⽹络错误",
      });
      setTimeout(() => hide(), 1500);
    }
  };
  const [mutateCheckTicket] = useMutation(checkTicket, {
    onSuccess: () => queryCache.invalidateQueries("getMyTiketList"),
  });
  const handleCheck = async () => {
    setVisible(true);
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
      <View>
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
                id={e.id}
                type={e.type}
                sequence={e.sequence}
                stu_num={e.stu_num}
                PopupState={PopupState}
              />
            </SwiperItem>
          ))}
        </Swiper>

        <SelectPopup
          isShow={popupState}
          title="退票说明"
          detail={`1.距离开场半个小时以内将不支持退票，若未退票且未观影者，将被计入不良信用档案。
            2.规定时间内退票不会对您的信用度造成任何影响。
          `}
          bottomType={2}
          confirmFun={handelReturnTicket}
          cancelFun={changePopupState}
        />
      </View>
      
      {/* <PrimaryButton
        onClick={handleCheck}
        className={styles.btn}
        disabled={
        dayjs(myTicketListRes.data[current].play_time).unix() + 1800 <
            now() || !myTicketListRes.data[current].effective
        }
      >
        {dayjs(myTicketListRes.data[current].play_time).unix() + 1800 < now() ||
        !myTicketListRes.data[current].effective
          ? "已失效"
          : "点击验票"}
      </PrimaryButton>
      <View className={styles.tips}>
        影票在开场30分钟后失效，请在⼯作⼈员指示下使⽤!
      </View> */}
      {/* <BottomPop
        isShow={visible}
        onCancel={handleConcel}
        onOk={handleOk}
        title="确认使⽤该影票？"
      /> */}
      <Popup.Comp />
    </View>
  );
};
export default MyTicket;
