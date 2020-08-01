import React, { useState, useEffect } from "react";
import { View, Image, Text, Button } from "@tarojs/components";
import Popup from "@/common/components/popup/index";
import NavBack from "@/common/components/nav-back";
import icon1 from "@/static/images/volunteer-icon1.png";
import icon2 from "@/static/images/volunteer-icon2.png";
import icon3 from "@/static/images/volunteer-icon3.png";
import wait from "@/static/images/wait.png";
import Picker from "../../components/picker/index";

import styles from "./index.module.scss";

const VolunteerDetail = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup === true) {
      setTimeout(() => setShowPopup(false), 3000);
    }
  }, [showPopup]);

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const cancelShowPicker = () => {
    setShowPicker(false);
  };

  const pushPicker = () => {
    setShowPicker(false);
    setShowPopup(true);
  };

  return (
    <View className={styles.wrapper}>
      <NavBack title="志愿报名" background="#F6F6F9" />
      <View className={styles.pic}>一张图片</View>
      <View className={styles.card}>
        <View className={styles.item1}>
          <View className={styles.title}>
            <View className={styles.name}>四月护花使者活动</View>
            <View className={styles.status}>招募中</View>
          </View>
          <View className={styles.timeWrap}>
            <View>报名时间</View>
            <View className={styles.time}>2020.07.05 15:30 开抢</View>
          </View>
          <View className={styles.timeWrap}>
            <View>志愿时间</View>
            <View className={styles.time}>2020.07.05-2020.07.09</View>
          </View>
        </View>

        <View className={styles.item2}>
          <View className={styles.subTitle}>
            <Image src={icon1} className={styles.icon} />
            <Text>活动介绍</Text>
          </View>
          <View className={styles.text}>
            志愿者需要在选择的志愿时间内，在指定地点进行护花活动，对进行随意摘花的同学、游客进行提醒，并告诫摘花的坏处等。
          </View>
        </View>
        <View className={styles.item2}>
          <View className={styles.subTitle}>
            <Image src={icon2} className={styles.icon} />
            <Text>活动规则</Text>
          </View>
          <View className={styles.text}>
            志愿者需要在选择的志愿时间内，在指定地点进行护花活动，对进行随意摘花的同学、游客进行提醒，并告诫摘花的坏处等。
          </View>
        </View>
        <View className={styles.item2}>
          <View className={styles.subTitle}>
            <Image src={icon3} className={styles.icon} />
            <Text>活动时长</Text>
          </View>
          <View className={styles.text}>2时长</View>
        </View>
      </View>
      <View />
      <Button
        className={styles.button}
        onClick={() => {
          handleShowPicker();
        }}
      >
        立即报名
      </Button>
      <Picker
        visible={showPicker}
        onCancel={cancelShowPicker}
        onOk={pushPicker}
      />
      <Popup
        detail="申请成功,申请结果将通过重邮小帮手进行通知"
        img={wait}
        isShow={showPopup}
      />
    </View>
  );
};

export default VolunteerDetail;
