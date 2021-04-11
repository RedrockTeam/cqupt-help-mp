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
import error from "@/static/images/error.png";
import wait from "@/static/images/wait.png";
import volunteerImg from "@/static/images/volunteer-img.jpg";
import {
  useQuery,
  useMutation,
} from "react-query/dist/react-query.production.min";
import Placeholder from "@/common/components/placeholder";
import Picker from "../../components/picker/index";
import ResumeForm from "../../components/resume-form";
import {
  getVolunteerActivityDetail,
  applyVolunteerActivity,
} from "../../services";
import styles from "./index.module.scss";
import { IVolunteerActivityDetail } from "../../services/dto";
// import VolunteerActivityDetail from "../../../../mock/VolunteerActivityDetail.json";

const VolunteerDetail = () => {
  const FORM_INPUT_FIELD_LIST = [1, 9, 4, 5, 6, 7, 8, 9, 10, 11];
  const FORM_TEXTAREA_FIELD_LIST = [3, 12, 13, 14];
  const { params } = useRouter();
  const [showPicker, setShowPicker] = useState(false);

  const [isScrolling, setIsScrolling] = useState(false);
  const [needResume, setNeedResume] = useState(false);
  const [pickerValue, setPickerValue] = useState<number[]>([0, 0]);
  const Popup = useContainer(PopupContext);

  let { data, isLoading, isError } = useQuery(
    ["getVolunteerActivityDetail", params.rely_id],
    getVolunteerActivityDetail
  );
  // data = VolunteerActivityDetail;
  let info: IVolunteerActivityDetail;
  let viewItems = null;
  let formInputField: number[] = [];
  let formTextareaField: number[] = [];
  if (data?.data) {
    console.log('data.need_additions:', data.data.need_additions)
    console.log('typeof need_additions:', typeof data.data.need_additions)
    info = data.data;

    console.log('pre-info:', info)

    //  判断是否为字符串
    if (typeof info.need_additions === 'string') {
      console.log('info.need_additions === string')
      if (info.need_additions?.length)
        info.need_additions = JSON.parse(info.need_additions);
      else
        info.need_additions = [];
      console.log('info:', info)
    }


    info.need_additions.forEach((v: number) => {
      FORM_INPUT_FIELD_LIST.includes(v) && formInputField.push(v);
      FORM_TEXTAREA_FIELD_LIST.includes(v) && formTextareaField.push(v);
    });
    const dateList = info.detail.map((item) => item.date);
    const timePartList = info.detail.map((item) => item.time_part_info);
    viewItems = {
      dateList,
      timePartList,
    };
  }

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
    if (!isScrolling) {
      setShowPicker(false);
      const [dateIndex, timePartIndex] = pickerValue;
      const date = info!.detail[dateIndex];
      const timePart = date.time_part_info[timePartIndex];
      if (timePart.now >= timePart.max + 10) {
        const hide = Popup.show({
          title: "申请失败",
          detail: "报名人数已满",
          img: error,
        });
        setTimeout(() => hide(), 1500);
        return;
      }
      await mutateApply({
        id: date.id,
        begin_time: timePart.begin_time,
        end_time: timePart.end_time,
        addition: JSON.stringify({}),
      });
    } else {
      console.log("scrolling");
    }
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const cancelShowPicker = () => {
    setShowPicker(false);
  };

  const timeChange = (e: ITouchEvent) => {
    const { value } = e.detail;
    const dateIndex = value[0]; // 要更改才生效
    const timePartIndex = value[1]; // 要更改才生效
    console.log("date", dateIndex);
    console.log("time", timePartIndex);
    setPickerValue([dateIndex, timePartIndex]);
  };

  if (isLoading) return <Placeholder title="志愿报名" />;
  if (isError || !data) return <Placeholder title="志愿报名" isError />;

  const renderRobBtn = () => {
    if (!info) return;
    const nowTimestamp = now();
    if (info.sign_up_start > nowTimestamp) {
      const leftTime = Math.ceil((info.sign_up_start - nowTimestamp) / 60);
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

    if (info.sign_up_last > nowTimestamp && info.sign_up_start < nowTimestamp) {
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
        </Fragment>
      );
    }
    return (
      <Button disabled className={styles.dis_button}>
        报名已截止
      </Button>
    );
  };

  const Detail = () => (
    <Fragment>
      <Image className={styles.pic} mode="aspectFill" src={volunteerImg} />
      <View className={styles.card}>
        <View className={styles.item1}>
          <View className={styles.title}>
            <View className={styles.name}>{info.name}</View>
            <View className={styles.status}>
              {info.sign_up_last > now() ? "招募中" : "已结束"}
            </View>
          </View>
          <View className={styles.timeWrap}>
            <View className={styles.label}>报名开始时间:</View>
            <Text userSelect selectable className={styles.time}>
              {timestampToFormString(info.sign_up_start)}
            </Text>
          </View>
          <View className={styles.timeWrap}>
            <View className={styles.label}>报名截止时间:</View>
            <Text userSelect selectable className={styles.time}>
              {timestampToFormString(info.sign_up_last)}
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
                info.start_date
              )} - ${timestampToDateString(info.last_date)}`}
            </Text>
          </View>
          <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Text>志愿时长</Text>
            </View>
            <Text userSelect selectable className={styles.text}>
              {info.hour}
            </Text>
          </View>
          <View className={styles.item2}>
            <View className={styles.subTitle}>
              <Text>招募人数</Text>
            </View>
            <Text userSelect selectable className={styles.text}>
              {info.num}
            </Text>
          </View>
        </View>
        <View className={styles.item2}>
          <View className={styles.subTitle}>
            <Text>活动介绍</Text>
          </View>
          <Text userSelect selectable className={styles.text}>
            {info.description}
          </Text>
        </View>
        <View className={styles.item2}>
          <View className={styles.subTitle}>
            <Text>活动规则</Text>
          </View>
          <Text userSelect selectable className={styles.text}>
            {info.role}
          </Text>
        </View>
        {renderRobBtn()}
        {info.need_additions.includes(-1) ? (
          <Picker
            value={pickerValue}
            viewItems={viewItems}
            visible={showPicker}
            onCancel={cancelShowPicker}
            onOk={handleApply}
            onTimeChange={timeChange}
            onPickStart={() => setIsScrolling(true)}
            onPickEnd={() => setIsScrolling(false)}
            dateIndex={pickerValue[0]}
          />
        ) : (
          <Picker
            value={pickerValue}
            viewItems={viewItems}
            visible={showPicker}
            onCancel={cancelShowPicker}
            onOk={() => {
              if (!isScrolling) {
                setShowPicker(false);
                setNeedResume(true);
              } else {
                console.log("scrolling");
              }
            }}
            onTimeChange={timeChange}
            onPickStart={() => setIsScrolling(true)}
            onPickEnd={() => setIsScrolling(false)}
            dateIndex={pickerValue[0]}
            title="请选择班次"
            btnText="确认班次"
          />
        )}
      </View>
      <View />
      <Popup.Comp />
    </Fragment>
  );

  const Resume = () => (
    <View className={styles.wrapper2}>
      <ResumeForm
        pickerValue={pickerValue}
        info={info}
        formInputField={formInputField}
        formTextareaField={formTextareaField}
      />
    </View>
  );
  return (
    <View className={styles.wrapper}>
      <NavBack title="志愿报名" background="#F6F6F9" />
      {needResume ? <Resume /> : <Detail />}
    </View>
  );
};

export default VolunteerDetail;
