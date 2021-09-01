/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState } from "react";
import {
  BaseEventOrigFunction,
  Image,
  ScrollView,
  Swiper,
  SwiperItem,
  Text,
  View,
} from "@tarojs/components";
import homeTicketIcon from "@/static/images/home-ticket-icon.png";
import homeCampusIcon from "@/static/images/home-campus-icon.png";
import homeVolunteerIcon from "@/static/images/home-volunteer-icon.png";
import homeIdIcon from "@/static/images/home-id-icon.png";
// import tmpHomeRecent from "@/static/images/tmp-home-recent.jpg";
import { ScrollViewProps } from "@tarojs/components/types/ScrollView";
import { navTo, resolvePage } from "@/common/helpers/utils";
import { useQuery } from "react-query/dist/react-query.production.min";
// import {useUserInfo} from "@/stores/user";
import Placeholder from "@/common/components/placeholder";
import Empty from "@/common/components/empty";
import { getHomeActivities } from "../../services";
import styles from "./index.module.scss";
import RecentActivity from "../../components/recent-activiey";
// TODO: 图床链接已失效，仅一个可用，下次找别的换了
const list = [
  // "https://wx.redrock.team/game/cqupt-help-mp/slider-img0.jpg",
  // "https://wx.redrock.team/game/cqupt-help-mp/slider-img1.jpg",
  "http://cdn.redrock.team/cqupt-help-mp_banner.png",
  // "https://wx.redrock.team/game/cqupt-help-mp/slider-img3.jpg",
  // "https://wx.redrock.team/game/cqupt-help-mp/slider-img4.jpg",
]; // 轮播图的图片

export default function Index() {
  // const {token} = useUserInfo();

  const [slidePercent, setSlidePercent] = useState(0);
  const handleSlideScroll: BaseEventOrigFunction<ScrollViewProps.onScrollDetail> = (
    e
  ) => {
    setSlidePercent((84 / e.detail.scrollWidth) * e.detail.scrollLeft);
  };
  const { data: homeActivityListRes, isError, isLoading } = useQuery(
    "getHomeActivities",
    getHomeActivities
  );

  const renderHomeActivityList = () => {
    if (isLoading)
      return (
        <View className={styles.holder}>
          <Placeholder />
        </View>
      );

    if (isError || !homeActivityListRes) {
      return <Placeholder isError={isError} />;
    }

    // TODO: 后端将所有活动均返回，过滤掉已过期掉活动，喊后端有空修
    homeActivityListRes.data = homeActivityListRes?.data?.length
      ? homeActivityListRes?.data?.filter(
          // @ts-ignore
          (activity) => activity.time_done > Date.parse(new Date()) / 1000
        )
      : [];

    return homeActivityListRes.data.length !== 0 ? (
      homeActivityListRes.data
        .sort((a, b) => a.time_done - b.time_done)
        .map((e) => {
          return (
            <RecentActivity
              name={e.name}
              id={e.id}
              key={e.id}
              teamName={e.team_name}
              timeDone={e.time_done}
              time={e.time}
              introduction={e.introduction}
              location={e.location}
              rule={e.rule}
              registration={e.registration}
              type={e.type}
              image={e.image}
              image_with={e.image_with}
            />
          );
        })
    ) : (
      <View>
        <Empty detail="暂无活动" />
      </View>
    );
  };

  return (
    <View className={styles.wrapper}>
      <Swiper
        className={styles.swiper}
        indicatorColor="#A7A3FF"
        indicatorActiveColor="#625AF8"
        indicatorDots
        circular
        autoplay
        // TODO: 修改 dot 样式
      >
        {list.map((e) => (
          <SwiperItem key={e}>
            <Image src={e} className={styles.bannerItem} mode="aspectFill" />
          </SwiperItem>
        ))}
      </Swiper>
      <View className={styles.slideWrapper}>
        <ScrollView
          className={styles.slide}
          scrollX
          scrollWithAnimation
          enableFlex
          onScroll={handleSlideScroll}
        >
          <View
            className={styles.slideItem}
            onClick={() => navTo({ url: resolvePage("ticket", "rob-ticket") })}
          >
            <Image src={homeTicketIcon} className={styles.slideImg} />
            <Text className={styles.slideText}>线上抢票</Text>
          </View>
          <View
            className={styles.slideItem}
            onClick={() => navTo({ url: resolvePage("campus", "index") })}
          >
            <Image src={homeCampusIcon} className={styles.slideImg} />
            <Text className={styles.slideText}>校园服务</Text>
          </View>
          <View
            className={styles.slideItem}
            onClick={() => navTo({ url: resolvePage("volunteer", "index") })}
          >
            <Image src={homeVolunteerIcon} className={styles.slideImg} />
            <Text className={styles.slideText}>志愿报名</Text>
          </View>
          {/* <View
            className={styles.slideItem}
            onClick={() =>
              navTo({
                url: "https://wx.redrock.team/game/youyue/#/",
                payload: {
                  title: "青春邮约",
                  t: token,
                },
                encode: true,
              })
            }
          >
            <Image src={homeYoungIcon} className={styles.slideImg} />
            <Text className={styles.slideText}>青春邮约</Text>
            <Image className={styles.newIcon} src={newIcon} />
          </View> */}
          <View
            className={styles.slideItem}
            onClick={() => navTo({ url: resolvePage("id", "index") })}
          >
            <Image src={homeIdIcon} className={styles.slideImg} />
            <Text className={styles.slideText}>身份有证</Text>
          </View>
        </ScrollView>
      </View>
      <View className={styles.scrollBar}>
        <View className={styles.scrollBarBg}>
          <View
            className={styles.scrollBarSlide}
            style={{
              // FIXME: 大于四个的时候删掉下面这行
              width: "100%",
              left: slidePercent,
            }}
          />
        </View>
      </View>
      <View className={styles.recentActivitiesWrapper}>
        <Text className={styles.title}>热门活动</Text>
        <View>{renderHomeActivityList()}</View>
      </View>
    </View>
  );
}
