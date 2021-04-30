import React, { useCallback, useState } from "react";
import { createContainer, useContainer } from "unstated-next";
import { getStorage, navigateBack, removeStorage, setStorage } from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
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
import {
  getRobTicketListInfo,
  robAlternateTicket,
  robTicket
} from "../../services";
import Ticket from "../../components/ticket";
import styles from "./index.module.scss";
// import ticketList from "../../../../mock/TicketList.json";
import SelectPopup from "../../components/select-popup";
import TypeHeader from "../../components/type-header";
import { navTo } from "@/common/helpers/utils";
import { resolvePage } from "@/common/helpers/utils";
import { RobTicketListInfoRes, RobTicketInfo } from "../../services/dto";

const PAGE_TITLE = "在线抢票";

const RobTicket = () => {
  const Popup = useContainer(PopupContext);
  const queryCache = useQueryCache();

  // 影票列表的处理
  /**
   * @description: 传入参数为影票种类，0为电影，1为讲座
   * @param {number} type
   * @return {*}
   */ 
   const filterObj = (type: number) => {
    if (ticketList === undefined) {
      return [];
    }
    if (type === 0) {
      return ticketList.data.filter(item => item.type === 0)
    } else if (type === 1) {
      return ticketList.data.filter(item => item.type === 1)
    }
  }

  // 选择弹窗
  const SelectPopupFun = () => {
    const [ state, setState ] = useState(false);
    const changeState = () => {
      if (state) {
        setState(false)
      } else {
        setState(true)
      }
    }
    return { state, setState , changeState }
  }
  const useSelectPopup = createContainer(SelectPopupFun);
  const SelectPopupDisplay = () => {
    const SelectPopupCounter = useSelectPopup.useContainer();
    // flag逻辑, 第一次进入有提示。
    getStorage({
      key: "remindRule",
      success: (res) => {
        if (res.data === true) {
          console.log(res.data);
          setStorage({
            key: "remindRule",
            data: false,
          })
        }
        // removeStorage({
        //   key: "remindRule"
        // })
        // SelectPopupCounter.setState(true);
      },
      fail: () => {
        setStorage({
          key: "remindRule",
          data: true,
        })
        SelectPopupCounter.setState(true);
      }
    })

    const Click = () => {
      // navTo({ url: resolvePage("ticket", "rob-ticket-info") })
      SelectPopupCounter.changeState();
    }

    return (
      <View>
        {/* <Button onClick={Click}>dianji</Button> */}
        <SelectPopup
          isShow={SelectPopupCounter.state}
          title="温馨提示"
          detail="1：本次线上影票仅面向重庆邮电大学师生，为公益性活动，禁止以牟利为目的的影票倒卖活动，一经发现，将被记入不良信用档案。
          2：如有特殊情况，不能到场者。请在开场前半个小时，进入“我的影票”页面，选择“我要退票”，退回自己的影票。
          3：若开场半个小时后，仍未验票入场，该票失效，同时您将被记入不良信用档案。
          4.候补票用户与正常抢票用户一致，遵守信用制等相关规定。获得候补票后未按时到场验票，也将被记录至不良信用档案。"
          bottomType={1}
          confirmFun={SelectPopupCounter.changeState}
          cancelFun={() => {}}
        />
      </View>
    )
  }

  const [ currentState, setCurrentState ] = useState<number>(0);
  const [ ticketListMovie, setTicketListMovie ] = useState<RobTicketInfo[]>([]);
  const [ ticketListLecture, setTicketListLecture ] = useState<RobTicketInfo[]>([]);

  const { data: ticketList, isLoading, isError } = useQuery(
    "robTicketListInfo",
    getRobTicketListInfo,
    {
      refetchInterval: 2000,
      onSuccess: (data: RobTicketListInfoRes) => {
        // if (data === undefined) {
        //   return;
        // }
        setTicketListLecture(data.data.filter(res => res.type === 0));
        setTicketListMovie(data.data.filter(res => res.type === 1));
      }
    }
  );
  // const isLoading = false;
  // const isError = false;


  // const ticketListMovie = filterObj(0);
  // const ticketListLecture = filterObj(1);
  // console.log(ticketListMovie);

  const [isRobing, setIsRobing] = useState(false);
  const [isAlternateRobing, setIsAlternateRobing] = useState(false);
  const [mutateRobTicket] = useMutation(robTicket, {
    onSuccess: () => queryCache.invalidateQueries("robTicketListInfo"),
  });
  const [mutateRobAlternateTicket] = useMutation(robAlternateTicket, {
    onSuccess: () => queryCache.invalidateQueries("robTicketListInfo"),
  });

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
  const handleAlternateRobTicket = async (id: number, re_send_num: number) => {
    let res: any;
    if (!isAlternateRobing) {
      setIsAlternateRobing(true);
      res = await mutateRobAlternateTicket(id);
      setIsAlternateRobing(false);
    } else {
      return;
    }

    if (res.status === 10000) {
      const hide = Popup.show({
        img: robSuccessImg,
        title: "恭喜您！候补成功！",
        detail: `目前您排在第${re_send_num}位。候补结果将通过重邮小帮手通知`,
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
  }

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  // console.log(ticketList);
  if (isError || !ticketList) return <Placeholder title={PAGE_TITLE} isError />;
  // if (ticketList.data.length === 0)
  //   return (
  //     <Empty
  //       title={PAGE_TITLE}
  //       detail="近期还没有影票可以抢哦～"
  //       suggestion="去首页看看活动吧"
  //       btnContent="查看活动"
  //       onBtnClick={() => navigateBack()}
  //     />
  //   );
  return (
    <View>
      <NavBack title={PAGE_TITLE} background="#FFFFFF" />
      <TypeHeader
        MovieFun={() => setCurrentState(1)}
        LectureFun={() => setCurrentState(0)}
      />
      <View className={styles.wrapper}>
        {
          currentState === 0?
          (
            ticketListLecture.length !== 0?
            (
              ticketListLecture
              .sort((a, b) => dayjs(a.begin_time).unix() - dayjs(b.begin_time).unix())
              .map((e) => (
                <Ticket
                  id={e.id}
                  playTime={dayjs(e.play_time).unix()}
                  endTime={dayjs(e.end_time).unix()}
                  robTime={dayjs(e.begin_time).unix()}
                  location={e.location}
                  remain={e.left}
                  image={e.image}
                  name={e.name}
                  isReceived={e.is_received}
                  onRobTicket={handleRobTicket}
                  onAlternateRobTicket={handleAlternateRobTicket}
                  key={e.id}
                  type={e.type}
                  all={e.all}
                  re_send_num={e.re_send_num}
                  chief={e.chief}
                />
              ))
            ):
            (
              <Empty
                title={PAGE_TITLE}
                detail="近期还没有影票可以抢哦～"
                suggestion="去首页看看活动吧"
                btnContent="查看活动"
                onBtnClick={() => navigateBack()}
              />
            )
          ):
          (
            ticketListMovie.length !== 0?
            (
              ticketListMovie
              .sort((a, b) => dayjs(a.begin_time).unix() - dayjs(b.begin_time).unix())
              .map((e) => (
                <Ticket
                  id={e.id}
                  playTime={dayjs(e.play_time).unix()}
                  endTime={dayjs(e.end_time).unix()}
                  robTime={dayjs(e.begin_time).unix()}
                  location={e.location}
                  remain={e.left}
                  image={e.image}
                  name={e.name}
                  isReceived={e.is_received}
                  onRobTicket={handleRobTicket}
                  onAlternateRobTicket={handleAlternateRobTicket}
                  key={e.id}
                  type={e.type}
                  all={e.all}
                  re_send_num={e.re_send_num}
                  chief={e.chief}
                />
              ))
            ):
            (
              <Empty
                title={PAGE_TITLE}
                detail="近期还没有影票可以抢哦～"
                suggestion="去首页看看活动吧"
                btnContent="查看活动"
                onBtnClick={() => navigateBack()}
              />
            )  
          )
        }
        {/* {currentList
          .sort((a, b) => dayjs(a.begin_time).unix() - dayjs(b.begin_time).unix())
          .map((e) => (
            <Ticket
              id={e.id}
              playTime={dayjs(e.play_time).unix()}
              endTime={dayjs(e.end_time).unix()}
              robTime={dayjs(e.begin_time).unix()}
              location={e.location}
              remain={e.left}
              image={e.image}
              name={e.name}
              isReceived={e.is_received}
              onRobTicket={handleRobTicket}
              onAlternateRobTicket={handleAlternateRobTicket}
              key={e.id}
              type={e.type}
              all={e.all}
              re_send_num={e.re_send_num}
              chief={e.chief}
            />
        ))} */}
      </View>
      <Popup.Comp />
      <useSelectPopup.Provider>
        <SelectPopupDisplay></SelectPopupDisplay>
      </useSelectPopup.Provider>
    </View>
  );
};

export default RobTicket;
