import React from "react";
import { View, Image, Text } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import NavBack from "@/common/components/nav-back";
import icon1 from "@/static/images/volunteer-icon1.png";
import icon2 from "@/static/images/volunteer-icon2.png";
import icon3 from "@/static/images/volunteer-icon3.png";
import success from "@/static/images/rob-success.png";
import error from "@/static/images/error.png";

import { useMutation } from "react-query/dist/react-query.production.min";
import styles from "./index.module.scss";
import { applyActivity } from "../../services";

const AcDetail = () => {
  const { params: encodedParams } = useRouter();
  const params: Record<string, string> = Object.keys(encodedParams).reduce(
    (acc, key) => ({ ...acc, [key]: decodeURIComponent(encodedParams[key]) }),
    {}
  );

  const Popup = useContainer(PopupContext);
  const [mutateApply] = useMutation(applyActivity);

  const handleApply = async () => {
    try {
      const res = await mutateApply({
        team: params.team,
        name: params.name,
        time: params.time,
      });
      if (res.status === 200) {
        // 憨批后端
        const hide = Popup.show({
          title: "报名成功",
          img: success,
        });
        setTimeout(() => {
          hide();
        }, 1500);
      } else {
        const hide = Popup.show({
          title: "报名失败",
          detail: "错误",
          img: error,
        });
        setTimeout(() => {
          hide();
        }, 1500);
      }
    } catch (e) {
      const hide = Popup.show({
        title: "报名失败",
        detail: "网络错误",
        img: error,
      });
      setTimeout(() => {
        hide();
      }, 1500);
    }
  };

  return (
    <View>
      <View className={styles.wrapper}>
        <NavBack title="活动详情" background="#F6F6F9" />
        <Image className={styles.pic} mode="aspectFill" src={params.image} />
        <View className={styles.card}>
          <View className={styles.item1}>
            <View className={styles.title}>
              <View className={styles.name}>{params.name}</View>
              <View className={styles.status}>招募中</View>
            </View>
            <View className={styles.timeWrap}>
              <View className={styles.label}>活动时间：</View>
              <Text userSelect className={styles.time}>
                {params.time}
              </Text>
            </View>
            <View className={styles.timeWrap}>
              <View className={styles.label}>参与方式：</View>
              <Text userSelect selectable className={styles.time}>
                {params.location}
              </Text>
            </View>
          </View>

          <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Image src={icon1} className={styles.icon} />
              <Text>活动介绍</Text>
            </View>
            <Text userSelect selectable className={styles.text}>
              {params.introduction}
            </Text>
          </View>
          <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Image src={icon2} className={styles.icon} />
              <Text>活动规则</Text>
            </View>
            <Text userSelect selectable className={styles.text}>
              {params.rule}
            </Text>
          </View>
          {/* <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Image src={icon3} className={styles.icon} />
              <Text>报名方式</Text>
            </View>
            <View className={styles.text}>{params.registration}</View>
          </View> */}
        </View>
        <View />
        {/* 暂不需要 */}
        {/* <Button onClick={handleApply} className={styles.button}>
          立即报名
        </Button> */}
      </View>

      <Popup.Comp />
    </View>
  );
};

export default AcDetail;
