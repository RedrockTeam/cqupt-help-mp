import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import NavBack from "@/common/components/nav-back";
import icon1 from "@/static/images/volunteer-icon1.png";
// import icon2 from "@/static/images/volunteer-icon2.png";
import success from "@/static/images/rob-success.png";
import error from "@/static/images/error.png";
import {
  useMutation,
} from "react-query/dist/react-query.production.min";

// import { ConvertingDatesToTimestamps } from "@/common/helpers/date";
import styles from "./index.module.scss";
import { applyActivity } from "../../services";
import { getVolunteerActivityDetail } from "../../../volunteer/services"
// import { setLocale } from "miniprogram-ci";
import { IVolunteerActivityDetail } from "@/modules/volunteer/services/dto";


const AcDetail = () => {
  const { params: initialParams } = useRouter();
  console.log(initialParams);
  const [params, setParams] = useState({} as IVolunteerActivityDetail);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVolunteerActivityDetail(initialParams.id).then(data => {
      setParams(data.data)
      setIsLoading(false)
    })
  }, [])

  const Popup = useContainer(PopupContext);
  const [mutateApply] = useMutation(applyActivity);
  const handleApply = async () => {
    try {
      const res = (await mutateApply({
        activity_id: Number(params.activity_id),
        begin_time: params.start_date,
        end_time: params.last_date,
      }))!;
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
      {isLoading ? <div></div> : <View className={styles.wrapper}>
        <NavBack title="活动详情" background="#F6F6F9" />
        {
          // eslint-disable-next-line eqeqeq
          params.images.length <= 1 ? (
            <Image
              className={styles.pic}
              mode="aspectFill"
              src={params.images[0]}
            />
          ) : (
            <Swiper
              className={styles.pic}
              indicatorColor="#999"
              indicatorActiveColor="#333"
              circular
              indicatorDots
              autoplay
            >
              {params.images
                .filter((e) => e != "")
                .map((e, index) => {
                  return (
                    // 修改 taro swpier样式清除问题
                    <SwiperItem
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        transform: `translate(${100 * index
                          }%, 0px) translateZ(0px)`,
                      }}
                      key={index}
                    >
                      <Image
                        className={styles.pic}
                        mode="aspectFill"
                        src={e}
                      />
                    </SwiperItem>
                  );
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
              <Text className={styles.time}>
                {params.start_date}
              </Text>
            </View>
            <View className={styles.timeWrap}>
              <View className={styles.label}>参与方式：</View>
              <Text selectable className={styles.time}>
                {params.place}
              </Text>
            </View>
          </View>

          <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Image src={icon1} className={styles.icon} />
              <Text>活动介绍</Text>
            </View>
            <Text selectable className={styles.text}>
              {params.introduction}
            </Text>
          </View>
          {/* <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Image src={icon2} className={styles.icon} />
              <Text>活动规则</Text>
            </View>
            <Text selectable className={styles.text}>
              {params.detail}
            </Text>
          </View> */}
          {/* <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Image src={icon3} className={styles.icon} />
              <Text>报名方式</Text>
            </View>
            <View className={styles.text}>{params.registration}</View>
          </View> */}
        </View>
        <View />
        <Button onClick={handleApply} className={styles.button}>
          立即报名
        </Button>
      </View>}


      <Popup.Comp />
    </View>
  );
};

export default AcDetail;
