import React from "react";
import { View, Image, Text, Button, Swiper, SwiperItem } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import NavBack from "@/common/components/nav-back";
import icon1 from "@/static/images/volunteer-icon1.png";
import icon2 from "@/static/images/volunteer-icon2.png";
import success from "@/static/images/rob-success.png";
import error from "@/static/images/error.png";
import { useQuery } from "react-query/dist/react-query.production.min";
import { useMutation } from "react-query/dist/react-query.production.min";
import styles from "./index.module.scss";
import { applyActivity } from "../../services";
import { ConvertingDatesToTimestamps } from "@/common/helpers/date"
const AcDetail = () => {
  const { params: encodedParams } = useRouter();
  const params: Record<string, string> = Object.keys(encodedParams).reduce(
    (acc, key) => ({ ...acc, [key]: decodeURIComponent(encodedParams[key]) }),
    {}
  );

  const Popup = useContainer(PopupContext);
  const [mutateApply] = useMutation(applyActivity);
  const handleApply = async () => {
    console.log("re")
    console.log(params)
    let temp = params.time.split(" - ")
    console.log(temp)
    try {
      const res = await mutateApply({
        activity_id: Number(params.id),
        begin_time: ConvertingDatesToTimestamps(temp[0]),
        end_time: ConvertingDatesToTimestamps(temp[1])
      });
      if (res.status === 10000) {
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
        {
          JSON.parse(params.image_with)[0] == "" ?
            <Image className={styles.pic} mode="aspectFill" src={params.image} />
            : (
              <Swiper
                className={styles.pic}
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay>
                {JSON.parse(params.image_with).filter(e => e != "").map((e, index) => {
                  return (
                    // 修改 taro swpier样式清除问题
                    <SwiperItem style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      transform: `translate(${100 * index}%, 0px) translateZ(0px)`
                    }} key={e.id}>
                      <Image className={styles.pic} mode="aspectFill" src={e} />
                    </SwiperItem>
                  )
                })}
              </Swiper>
            )
        }
        <View className={styles.card}>
          <View className={styles.item1}>
            <View className={styles.title}>
              <View className={styles.name}>{params.name}</View>
              <View className={styles.status}>活动中</View>
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
        <Button onClick={handleApply} className={styles.button}>
          立即报名
        </Button>
      </View>

      <Popup.Comp />
    </View>
  );
};

export default AcDetail;
