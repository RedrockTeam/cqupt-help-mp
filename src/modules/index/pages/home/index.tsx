import React, { useState } from "react";
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  Image,
  ScrollView,
  BaseEventOrigFunction,
} from "@tarojs/components";
import homeTicketIcon from "@/static/images/home-ticket-icon.png";
import homeCampusIcon from "@/static/images/home-campus-icon.png";
import homeVolunteerIcon from "@/static/images/home-volunteer-icon.png";
import homeYoungIcon from "@/static/images/home-young-icon.png";
import homeIdIcon from "@/static/images/home-id-icon.png";
import tmpHomeBanner from "@/static/images/tmp-home-banner.jpg";
import tmpHomeBanner1 from "@/static/images/tmp-home-banner2.jpg";
import tmpHomeRecent from "@/static/images/tmp-home-recent.jpg";
import { ScrollViewProps } from "@tarojs/components/types/ScrollView";
import { resolvePage, navTo } from "@/common/helpers/utils";
import styles from "./index.module.scss";
import RecentActivity from "../../components/recent-activiey";

const list = [tmpHomeBanner, tmpHomeBanner1];

const recentActivityList: {
  remain: number;
  name: string;
  type: 1 | 2;
  url: string;
  org: string;
  startTime: number;
  endTime: number;
  img: string;
}[] = [
  {
    remain: 1,
    name: "学长学姐教教我",
    type: 1,
    org: "红岩网校",
    startTime: 1599999999,
    endTime: 1600000000,
    img: tmpHomeRecent,
    url: "https://wx.redrock.team/game/help-form/",
  },
  {
    remain: 3,
    name: "学长学姐教教我2",
    type: 2,
    org: "红岩网校",
    startTime: 1599999999,
    endTime: 1600000000,
    url: "https://wx.redrock.team/game/help-form/",
    img: tmpHomeRecent,
  },
  {
    remain: 5,
    name: "学长学姐教教我3",
    type: 1,
    org: "红岩网校",
    startTime: 1599999999,
    endTime: 1600000000,
    url: "/modules/feedback/pages/index/index",
    img: tmpHomeRecent,
  },
  {
    remain: 20,
    name: "学长学姐教教我4",
    type: 2,
    org: "红岩网校",
    startTime: 1599999999,
    endTime: 1600000000,
    url: "/modules/feedback/pages/index/index",
    img: tmpHomeRecent,
  },
];

export default function Index() {
  const [slidePercent, setSlidePercent] = useState(0);
  const handleSlideScroll: BaseEventOrigFunction<ScrollViewProps.onScrollDetail> = (
    e
  ) => {
    setSlidePercent((84 / e.detail.scrollWidth) * e.detail.scrollLeft);
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
            onClick={() => navTo({ url: resolvePage("volunteer", "entry") })}
          >
            <Image src={homeVolunteerIcon} className={styles.slideImg} />
            <Text className={styles.slideText}>志愿报名</Text>
          </View>
          <View
            className={styles.slideItem}
            onClick={() =>
              navTo({ url: "https://wx.redrock.team/game/help-form/" })
            }
          >
            <Image src={homeYoungIcon} className={styles.slideImg} />
            <Text className={styles.slideText}>青春邮约</Text>
          </View>
          <View
            className={styles.slideItem}
            onClick={() => navTo({ url: resolvePage("id", "index") })}
          >
            <Image src={homeIdIcon} className={styles.slideImg} />
            <Text className={styles.slideText}>身份有证</Text>
          </View>
        </ScrollView>
        <View className={styles.scrollBar}>
          <View className={styles.scrollBarBg}>
            <View
              className={styles.scrollBarSlide}
              style={{
                left: slidePercent,
              }}
            />
          </View>
        </View>
      </View>
      <View className={styles.recentActivitiesWrapper}>
        <Text className={styles.title}>热门活动</Text>
        {recentActivityList.map((e) => (
          <RecentActivity {...e} key={e.name} />
        ))}
      </View>
    </View>
  );
}
