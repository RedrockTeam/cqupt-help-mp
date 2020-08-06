import React, { useState } from "react";
import { View, Image, Text, Button } from "@tarojs/components";
import { redirectTo, useRouter } from "@tarojs/taro";
import { resolvePage } from "@/common/helpers/utils";
import { timestampToDateString } from "@/common/helpers/date";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import NavBack from "@/common/components/nav-back";
import icon1 from "@/static/images/volunteer-icon1.png";
import icon2 from "@/static/images/volunteer-icon2.png";
import icon3 from "@/static/images/volunteer-icon3.png";
import wait from "@/static/images/wait.png";

import { useQuery } from "react-query/dist/react-query.production.min";
import { useMutation } from "react-query";
import Picker from "../../components/picker/index";
import {
  getVolunteerActivityDetail,
  applyVolunteerActivity,
} from "../../services";

import styles from "./index.module.scss";

const VolunteerDetail = () => {
  const { params } = useRouter();
  const [showPicker, setShowPicker] = useState(false);
  const [selectTime, setSelectTime] = useState(0);

  const Popup = useContainer(PopupContext);

  const { data } = useQuery(
    ["getVolunteerActivityDetail", params.id],
    getVolunteerActivityDetail
  );
  // TODO: 后端接口返回存在问题

  const [mutateApply] = useMutation(applyVolunteerActivity);
  const handleApply = async () => {
    try {
      const data = await mutateApply({ id: params.id, timePart: selectTime });
      setShowPicker(false);
      if (data.status === 10020) {
        const hide = Popup.show({
          title: "申请失败",
          detail: "参数设置错误",
        });
        setTimeout(() => hide(), 3000);
      } else {
        const hide = Popup.show({
          title: "申请成功",
          detail: "申请结果将会通过重邮小帮手进行通知",
          img: wait,
        });
        setTimeout(() => {
          hide();
          redirectTo({ url: resolvePage("volunteer", "index") });
        }, 3000);
        return null;
      }
    } catch (e) {
      const hide = Popup.show({
        title: "登录失败",
        detail: "网络错误",
      });
      setTimeout(() => hide(), 3000);
    }
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const cancelShowPicker = () => {
    setShowPicker(false);
  };

  const timeChange = (e) => {
    const timePart = e.detail.value[0];
    setSelectTime(timePart);
    //
  };

  return (
    <View>
      {data ? (
        <View className={styles.wrapper}>
          <NavBack title="志愿报名" background="#F6F6F9" />
          <View className={styles.pic}>一张图片</View>
          <View className={styles.card}>
            <View className={styles.item1}>
              <View className={styles.title}>
                <View className={styles.name}>{data.data.name}</View>
                <View className={styles.status}>招募中</View>
              </View>
              <View className={styles.timeWrap}>
                <View>报名截止时间:</View>
                <View className={styles.time}>
                  {timestampToDateString(data.data.last_date)}
                </View>
              </View>
              <View className={styles.timeWrap}>
                <View>志愿服务时间:</View>
                <View className={styles.time}>
                  {timestampToDateString(data.data.date)}
                </View>
              </View>
            </View>

            <View className={styles.item2}>
              <View className={styles.subTitle}>
                <Image src={icon1} className={styles.icon} />
                <Text>活动介绍</Text>
              </View>
              <View className={styles.text}>{data.data.description}</View>
            </View>
            <View className={styles.item2}>
              <View className={styles.subTitle}>
                <Image src={icon2} className={styles.icon} />
                <Text>活动规则</Text>
              </View>
              <View className={styles.text}>{data.data.role}</View>
            </View>
            <View className={styles.item2}>
              <View className={styles.subTitle}>
                <Image src={icon3} className={styles.icon} />
                <Text>活动时长</Text>
              </View>
              <View className={styles.text}>{data.data.hour}</View>
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
            onOk={handleApply}
            onTimeChange={timeChange}
          />
          <Popup.Comp />
        </View>
      ) : null}
    </View>
  );
};

export default VolunteerDetail;
