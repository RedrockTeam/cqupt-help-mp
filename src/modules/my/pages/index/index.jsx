import React, { useState } from "react";
import { View, Image, Text, OpenData } from "@tarojs/components";
import { resolvePage, navTo } from "@/common/helpers/utils";
import request from "@/common/helpers/request";
import avator from "@/static/images/empty.png";
import aboutIcon from "@/static/images/about-icon.png";
import loginOut from "@/static/images/login-out-icon.png";
import feedbackIcon from "@/static/images/feedback-icon.png";
import enter from "@/static/images/campus-enter-icon.png";
import ticketIcon from "@/static/images/ticket-icon.png";
import campusIcon from "@/static/images/campus-icon.png";
import prizeIcon from "@/static/images/prize-icon.png";
import { useUserInfo } from "@/stores/user";
import { redirectTo } from "@tarojs/taro";
import styles from "./index.module.scss";

const MyIndex = () => {
  const userInfo = useUserInfo();
  const [showPop, setshowPop] = useState(false);
  const handleLoginout = async () => {
    const res = await request("https://wx.redrock.team/magicloop/unbind/xcx");
    if (res.status === 10000) {
      redirectTo({
        url: resolvePage("index", "bind"),
      });
    }
  };
  return (
    <View>
      <View className={styles.top}>
        <View className={styles.top_top}>
          <View>
            <OpenData
              className={styles.avator}
              type="userAvatarUrl"
              defaultAvatar={avator}
            />
          </View>
          <View className={styles.top_left}>
            <View className={styles.name}>{userInfo.realName}</View>
            <View className={styles.info}>学号：{userInfo.stuNum}</View>
            <View className={styles.info}>专业：{userInfo.college}</View>
          </View>
        </View>
        <View className={styles.top_bottom}>
          <View onClick={() => navTo({ url: resolvePage("my", "my-reward") })}>
            <Image className={styles.pic1} src={prizeIcon} />
            <Text className={styles.text}>我的奖品</Text>
          </View>
          <View
            onClick={() => navTo({ url: resolvePage("my", "my-activity") })}
          >
            <Image className={styles.pic2} src={campusIcon} />
            <Text className={styles.text}>我的活动</Text>
          </View>
          <View
            onClick={() => navTo({ url: resolvePage("ticket", "my-ticket") })}
          >
            <Image className={styles.pic3} src={ticketIcon} />
            <Text className={styles.text}>我的影票</Text>
          </View>
        </View>
      </View>

      <View className={styles.list}>
        <View
          className={styles.feedback}
          onClick={() => navTo({ url: resolvePage("feedback", "index") })}
        >
          <Image src={feedbackIcon} className={styles.icon} />
          <Text className={styles.text}>意见反馈</Text>
          <Image src={enter} className={styles.enter} />
        </View>
        <View
          className={styles.about}
          onClick={() =>
            navTo({
              url: "https://wx.redrock.team/game/about-us/mobile.html",
              payload: { title: "红岩网校 - 关于我们" },
            })
          }
        >
          <Image src={aboutIcon} className={styles.icon} />
          <Text className={styles.text}>关于我们</Text>
          <Image src={enter} className={styles.enter} />
        </View>
      </View>
      <View className={styles.listAccount}>
        <View className={styles.loginOut} onClick={() => navTo({ url: resolvePage("account-safe", "index") })}>
          <Image className={styles.icon} src={loginOut} />
          <Text className={styles.text}>账号安全</Text>
          <Image src={enter} className={styles.enter} />
        </View>
        <View className={styles.loginOut} onClick={() => setshowPop(true)}>
          <Image className={styles.icon} src={loginOut} />
          <Text className={styles.text}>切换账号</Text>
        </View>
      </View>
      {showPop ?
        <View>
          <View className={styles.cover} />
          <View className={styles.popWindow}>
            <View className={styles.title}>确定退出当前账号？</View>
            <View className={styles.confirm} onClick={() => handleLoginout()}>确定</View>
            <View className={styles.cancel} onClick={() => setshowPop(false)}>取消</View>
          </View>
        </View>
        : null}
    </View>
  );
};

export default MyIndex;
