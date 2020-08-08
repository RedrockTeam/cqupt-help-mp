import React from "react";
import Taro, { switchTab } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  useQuery,
  useQueryCache,
  useMutation,
} from "react-query/dist/react-query.production.min";
import error from "@/static/images/error.png";
import { resolvePage } from "@/common/helpers/utils";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import Empty from "@/common/components/empty";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import Reward from "../../components/reward";
import styles from "./index.module.scss";
import { getMyRewards, applyMyRewards } from "../../services";

const PAGE_TITLE = "我的奖品";

const MyReward = () => {
  const queryCache = useQueryCache();
  const { data: myRewardListRes, isLoading, isError } = useQuery(
    "getMyRewards",
    getMyRewards
  );
  const Popup = useContainer(PopupContext);
  const [mutateApplyMyReward] = useMutation(applyMyRewards, {
    onSuccess(res) {
      if (res.status === 10000) {
        queryCache.invalidateQueries("getMyRewards");
      } else {
        const hide = Popup.show({
          title: "领取失败",
          detail: "错误",
          img: error,
        });
        setTimeout(() => {
          hide();
        }, 3000);
      }
    },
    onError(e) {
      const hide = Popup.show({
        title: "领取失败",
        detail: "网络错误",
        img: error,
      });
      setTimeout(() => {
        hide();
      }, 3000);
    },
  });

  const handleReceiveReward = async (id: number) => {
    const res = await Taro.showActionSheet({
      itemList: ["确定"],
      fail(e) {
        console.log(e);
      },
    });
    if (res.tapIndex === 0) {
      await mutateApplyMyReward(id);
    }
  };

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !myRewardListRes)
    return <Placeholder title={PAGE_TITLE} isError />;
  if (myRewardListRes.prizes.length === 0)
    return (
      <Empty
        title={PAGE_TITLE}
        detail="奖品空空如也哦～"
        suggestion="快去参加活动领取奖品吧"
        onBtnClick={() => switchTab({ url: resolvePage("index", "home") })}
        btnContent="查看活动"
      />
    );
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      {myRewardListRes.prizes.map((e) => (
        <Reward
          activityName={e.activity_name}
          name={e.name}
          level={e.level}
          location={e.location}
          beginTime={e.time_begin}
          endTime={e.time_end}
          organizer={e.organizers}
          isReceived={e.is_received}
          key={e.activity_id}
          apply={() => handleReceiveReward(e.activity_id)}
        />
      ))}
    </View>
  );
};

export default MyReward;
