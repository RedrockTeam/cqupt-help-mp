import React from "react";
import { View, Image, Text, OpenData } from "@tarojs/components";
import { resolvePage, navTo } from "@/common/helpers/utils";
import avator from "@/static/images/empty.png";
import aboutIcon from "@/static/images/about-icon.png";
import feedbackIcon from "@/static/images/feedback-icon.png";
import enter from "@/static/images/campus-enter-icon.png";
import ticketIcon from "@/static/images/ticket-icon.png";
import campusIcon from "@/static/images/campus-icon.png";
import prizeIcon from "@/static/images/prize-icon.png";
// import { useQuery } from "react-query/dist/react-query.production.min";
import getUserInfo from "@/stores/user";
import styles from "./index.module.scss";

const MyIndex = () => {
  const userInfo = getUserInfo();
  // const { data: userInfo } = useQuery("userInfo", () =>
  //   getToken().then((t) => parseToken(t))
  // );
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
            <Image className={styles.pic} src={prizeIcon} />
            <Text className={styles.text}>我的奖品</Text>
          </View>
          <View
            onClick={() => navTo({ url: resolvePage("my", "my-activity") })}
          >
            <Image className={styles.pic} src={campusIcon} />
            <Text className={styles.text}>我的活动</Text>
          </View>
          <View
            onClick={() => navTo({ url: resolvePage("ticket", "my-ticket") })}
          >
            <Image className={styles.pic} src={ticketIcon} />
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
            navTo({ url: "https://wx.redrock.team/game/help-form/" })
          }
        >
          <Image src={aboutIcon} className={styles.icon} />
          <Text className={styles.text}>关于我们</Text>
          <Image src={enter} className={styles.enter} />
        </View>
      </View>
    </View>
  );
};

export default MyIndex;
