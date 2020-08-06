import React from "react";
import Taro, { switchTab } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { useQuery } from "react-query/dist/react-query.production.min";
import { useMutation, queryCache } from "react-query";
import { resolvePage } from "@/common/helpers/utils";
import PrimaryButton from "@/common/components/primary-button";
import NavBack from "@/common/components/nav-back";
import emptyImg from "@/static/images/empty.png";
import Reward from "../../components/reward";
import styles from "./index.module.scss";
import { getMyRewards, applyMyRewards } from "../../services";

// const rewardList = [
//   {
//     activity_name: "社团达人秀",
//     name: "2de",
//     level: 2,
//     location: "红岩网校A区",
//     time_begin: 1590746384,
//     time_end: 1598889600,
//     organizers: "红岩网校",
//     activity_id: 13,
//     is_received: 1,
//     index: 0,
//   },
// ];

const MyReward = () => {
  const { data } = useQuery(["getMyRewards"], getMyRewards);
  const [mutateApplyMyReward] = useMutation(applyMyRewards, {
    onSuccess: () => queryCache.invalidateQueries("getMyRewards"),
  });

  const handleReceiveReward = async (id: number) => {
    const res = await Taro.showActionSheet({
      itemList: ["确定"],
      fail(e) {
        // eslint-disable-next-line no-console
        console.log(e);
      },
    });
    if (res.tapIndex === 0) {
      const res = await mutateApplyMyReward(id);
      console.log(id);
    }
  };

  const handleNavigateToActivity = () =>
    switchTab({ url: resolvePage("index", "home") });
  const hasRewards = data?.prizes.length !== 0;

  const renderRewardList = () => (
    <View className={styles.wrapper}>
      <NavBack title="我的奖品" background="#F6F6F9" />
      {data?.prizes.length &&
        data?.prizes.map((e) => (
          <Reward
            {...e}
            key={`${e.activity_name}-${e.name}`}
            apply={() => handleReceiveReward(e.activity_id)}
          />
        ))}
    </View>
  );
  const renderEmpty = () => (
    <View className={styles.emptyWrapper}>
      <NavBack title="我的奖品" background="#FFFFFF" />
      <Image src={emptyImg} className={styles.img} />
      <Text className={styles.text}>奖品空空如也哦~</Text>
      <Text className={styles.text}>快去参加活动领取奖品吧</Text>
      <PrimaryButton className={styles.btn} onClick={handleNavigateToActivity}>
        查看活动
      </PrimaryButton>
    </View>
  );
  return hasRewards ? renderRewardList() : renderEmpty();
};

export default MyReward;
