import React, { useState, Fragment } from "react";
import { View, Image, Text, Button, ITouchEvent } from "@tarojs/components";
import { useRouter, navigateBack } from "@tarojs/taro";
import {
  timestampToFormString,
  timestampToDateString,
  now,
  gapDay,
} from "@/common/helpers/date";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import NavBack from "@/common/components/nav-back";
import icon1 from "@/static/images/volunteer-icon1.png";
import icon2 from "@/static/images/volunteer-icon2.png";
import icon3 from "@/static/images/volunteer-icon3.png";
import error from "@/static/images/error.png";
import wait from "@/static/images/wait.png";
import volunteerImg from "@/static/images/volunteer-img.jpg";
import {
  useQuery,
  useMutation,
} from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
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

  const { data, isLoading, isError } = useQuery(
    ["getVolunteerActivityDetail", params.id],
    getVolunteerActivityDetail
  );

  const [mutateApply] = useMutation(applyVolunteerActivity, {
    onSuccess(res) {
      if (res.status === 10000) {
        const hide = Popup.show({
          title: "申请成功",
          detail: "申请结果将会通过重邮小帮手进行通知",
          img: wait,
        });
        setTimeout(() => {
          hide();
          navigateBack();
        }, 1500);
      } else {
        const hide = Popup.show({
          title: "申请失败",
          detail: "错误",
          img: error,
        });
        setTimeout(() => hide(), 1500);
      }
    },
    onError() {
      const hide = Popup.show({
        title: "申请失败",
        detail: "网络错误",
        img: error,
      });
      setTimeout(() => hide(), 1500);
    },
  });

  const handleApply = async () => {
    setShowPicker(false);
    await mutateApply({ id: params.id, timePart: selectTime });
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const cancelShowPicker = () => {
    setShowPicker(false);
  };

  const timeChange = (e: ITouchEvent) => {
    const timePart = e.detail.value[0];
    setSelectTime(timePart);
  };

  if (isLoading) return <Placeholder title="志愿报名" />;
  if (isError || !data) return <Placeholder title="志愿报名" isError />;
  return (
    <View className={styles.wrapper}>
      <NavBack title="志愿报名" background="#F6F6F9" />
      <Image className={styles.pic} mode="aspectFill" src={volunteerImg} />
      <View className={styles.card}>
        <View className={styles.item1}>
          <View className={styles.title}>
            <View className={styles.name}>{data.data.name}</View>
            <View className={styles.status}>
              {data.data.last_date > now() ? "招募中" : "已结束"}
            </View>
          </View>
          <View className={styles.timeWrap}>
            <View className={styles.label}>报名截止时间:</View>
            <View className={styles.time}>
              {timestampToFormString(data.data.last_date)}
            </View>
          </View>
          <View className={styles.timeWrap}>
            <View className={styles.label}>志愿服务时间:</View>
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
      {data.data.last_date > now() ? (
        <Fragment>
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
        </Fragment>
      ) : null}
      <Popup.Comp />
    </View>
  );
};

export default VolunteerDetail;