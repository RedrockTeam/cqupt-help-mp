import React from "react";
import { View, Swiper, SwiperItem } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import tmpImg from "@/static/images/tmp-ticket-img.png";
import PrimaryButton from "@/common/components/primary-button";
import styles from "./index.module.scss";
import OwedTicket from "../../components/owed-ticket";

const list = [
  {
    name: "隐秘的角落1",
    img: tmpImg,
    location: "重庆邮电大学科技会堂",
    time: 1600000000,
  },
  {
    name: "隐秘的角落2",
    img: tmpImg,
    location: "重庆邮电大学科技会堂",
    time: 1600000000,
  },
  {
    name: "隐秘的角落3",
    img: tmpImg,
    location: "重庆邮电大学科技会堂",
    time: 1600000000,
  },
  {
    name: "隐秘的角落4",
    img: tmpImg,
    location: "重庆邮电大学科技会堂",
    time: 1600000000,
  },
];

const MyTicket = () => {
  return (
    <View className={styles.wrapper}>
      <NavBack title="我的影票" background="#F6F6F9" />
      <Swiper
        className={styles.swiper}
        indicatorColor="#A7A3FF"
        indicatorActiveColor="#625AF8"
        indicatorDots
      >
        {list.map((e) => (
          <SwiperItem>
            <OwedTicket {...e} key={e.name} />
          </SwiperItem>
        ))}
      </Swiper>
      <PrimaryButton className={styles.btn}>点击验票</PrimaryButton>
    </View>
  );
};

export default MyTicket;
