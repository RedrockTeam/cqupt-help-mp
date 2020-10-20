import React, { useState, Fragment } from "react";
import { View, Image, Text, Button, ITouchEvent } from "@tarojs/components";
import { useRouter, navigateBack } from "@tarojs/taro";
import {
  timestampToFormString,
  timestampToDateString,
  now,
} from "@/common/helpers/date";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import NavBack from "@/common/components/nav-back";
// import icon1 from "@/static/images/volunteer-icon1.png";
// import icon2 from "@/static/images/volunteer-icon2.png";
// import icon3 from "@/static/images/volunteer-icon3.png";
import error from "@/static/images/error.png";
import wait from "@/static/images/wait.png";
import volunteerImg from "@/static/images/volunteer-img.jpg";
import {
  useQuery,
  useMutation,
} from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
// import PrimaryButton from "@/common/components/primary-button";
import Picker from "../../components/picker/index";
import {
  getVolunteerActivityDetail,
  applyVolunteerActivity,
} from "../../services";
import styles from "./index.module.scss";

import VolunteerActivityDetail from "../../../../mock/VolunteerActivityDetail.json";

const VolunteerDetail = () => {
  const { params } = useRouter();
  const [showPicker, setShowPicker] = useState(false);
  const [timePartIndex, setTimePartIndex] = useState<number>(0);

  const Popup = useContainer(PopupContext);

  let { data, isLoading, isError } = useQuery(
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
    if (data) {
      const timePart = data.data.time_part[timePartIndex];
      await mutateApply({
        id: params.id,
        begin_time: timePart.begin_time,
        end_time: timePart.end_time,
      });
    }
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const cancelShowPicker = () => {
    setShowPicker(false);
  };

  const timeChange = (e: ITouchEvent) => {
    const index = e.detail.value[0]; // 要更改才生效
    setTimePartIndex(index);
  };

  if (isLoading) return <Placeholder title="志愿报名" />;
  if (isError || !data) return <Placeholder title="志愿报名" isError />;

  const renderRobBtn = () => {
    const nowTimestamp = now();
    if (data.data.sign_up_start > nowTimestamp) {
      const leftTime = Math.round(
        (data.data.sign_up_start - nowTimestamp) / 60
      );
      if (leftTime < 30) {
        return (
          <Button disabled className={styles.dis_button}>
            距离报名还有 {leftTime} min
          </Button>
        );
      }
      return (
        <Button disabled className={styles.dis_button}>
          报名还未开始
        </Button>
      );
    }

    if (
      data.data.sign_up_last > nowTimestamp &&
      data.data.sign_up_start < nowTimestamp
    ) {
      return (
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
            value={data.data.time_part}
            visible={showPicker}
            onCancel={cancelShowPicker}
            onOk={handleApply}
            onTimeChange={timeChange}
          />
        </Fragment>
      );
    }
    return (
      <Button disabled className={styles.dis_button}>
        报名已截止
      </Button>
    );
  };
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
            <View className={styles.label}>招募开始:</View>
            <Text userSelect selectable className={styles.time}>
              {timestampToFormString(data.data.sign_up_start) + "开抢"}
            </Text>
          </View>
          <View className={styles.timeWrap}>
            <View className={styles.label}>报名截至:</View>
            <Text userSelect selectable className={styles.time}>
              {`${timestampToDateString(
                data.data.sign_up_start
              )} - ${timestampToDateString(data.data.sign_up_last)}`}
            </Text>
          </View>
        </View>
        <View className={styles.border}>
          <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Text>活动时间</Text>
            </View>
            <Text userSelect selectable className={styles.text}>
              {`${timestampToDateString(
                data.data.start_date
              )} - ${timestampToDateString(data.data.last_date)}`}
            </Text>
          </View>
          <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Text>志愿时长</Text>
            </View>
            <Text userSelect selectable className={styles.text}>
              {data.data.hour}
            </Text>
          </View>
          <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Text>招募人数</Text>
            </View>
            <Text userSelect selectable className={styles.text}>
              {data.data.num}
            </Text>
          </View>
        </View>
        <View className={styles.item2}>
          <View className={styles.subTitle}>
            <Text>活动介绍</Text>
          </View>
          <Text userSelect selectable className={styles.text}>
            {data.data.description}
          </Text>
        </View>
        <View className={styles.item2}>
          <View className={styles.subTitle}>
            <Text>活动规则</Text>
          </View>
          <Text userSelect selectable className={styles.text}>
            {data.data.role}
          </Text>
        </View>
        {renderRobBtn()}
      </View>
      <View />
      {/* {data.data.last_date > now() ? (
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
            value={data.data.time_part}
            visible={showPicker}
            onCancel={cancelShowPicker}
            onOk={handleApply}
            onTimeChange={timeChange}
          />
        </Fragment>
      ) : null} */}
      <Popup.Comp />
    </View>
  );
};

export default VolunteerDetail;
