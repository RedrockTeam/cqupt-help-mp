import React, {useState} from "react";
import {Params} from "@/modules/volunteer/pages/application";
import {navigateBack, useRouter} from "@tarojs/taro";
import {Button, ITouchEvent, Text, View} from "@tarojs/components";
import styles from "@/modules/volunteer/pages/change-time/index.module.scss";
import NavBack from "@/common/components/nav-back";
import {useQuery} from "react-query/dist/react-query.production.min";
import {getVolunteerActivityDetail, postVolunteerActivityChange} from "@/modules/volunteer/services";
import error from "@/static/images/error.png";
import {useContainer} from "unstated-next";
import PopupContext from "@/stores/popup";
import PickerTimeBasic from "@/modules/volunteer/components/picker-time-basic";
import {genSeconds, timestampToHMString, timestampToMDString} from "@/common/helpers/date";
import {useMutation} from "react-query";
import Placeholder from "@/common/components/placeholder";


const PAGE_TITLE = "修改班次";
const BACKGROUND = "#F6F6F9";

const VolunteerChangeTime = () => {
  let {
    name,
    team_name,
    start_date,
    last_date,
    rely_id,
    date: date_part,
    activity_id
  } = useRouter().params as Params;


  // picker
  const Popup = useContainer(PopupContext);
  const [date, setDate] = useState<string>(date_part.split(' ')[0])
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [timePart, setTimePart] = useState<string>(date_part.split(' ')[1])
  const [timePartIndex, setTimePartIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [, setShowPicker] = useState(true);

  let {data, isLoading = true, isError = false} = useQuery(
    ["getVolunteerActivityDetail", rely_id],
    getVolunteerActivityDetail
  );


  /**
   * 生成picker表头时间字符串
   * @param data          后端返回的data
   * @param dateIndex     number
   * @param timePartIndex number
   */
  const gen_date_str = (data, dateIndex, timePartIndex) => {
    let date = data.data.detail[dateIndex];
    const timePart = date.time_part_info[timePartIndex];

    // console.log('date:', date)

    date = timestampToMDString(date.date);
    setDate(date)
    setTimePart(`${timestampToHMString(timePart.begin_time)} - ${timestampToHMString(timePart.end_time)}`)
    // console.log('date:', date)
    // console.log('time:', `${timestampToHMString(timePart.begin_time)} - ${timestampToHMString(timePart.end_time)}`)
  }


  //  处理获取的 data.detail 生成正确的 piker 的值
  let pickerValue;
  if (data) {
    const dateList = data.data.detail.map((item) => item.date);
    const timePartList = data.data.detail.map((item) => item.time_part_info);
    pickerValue = {
      dateList,
      timePartList,
    };
  }

  //  点击piker时改变时间
  const timeChange = (e: ITouchEvent) => {
    const dateIndex = e.detail.value[0]; // 要更改才生效
    const timePartIndex = e.detail.value[1]; // 要更改才生效
    setDateIndex(dateIndex);
    setTimePartIndex(timePartIndex);
    gen_date_str(data, dateIndex, timePartIndex)
  };

  //  提交更改信息
  const [mutateChange] = useMutation(postVolunteerActivityChange, {
      onSuccess(res) {
        if (res.status === 10000) {
          const hide = Popup.show({
            detail: "修改成功!",
          });
          const timer = setTimeout(() => {
            hide();
            clearTimeout(timer);
            navigateBack().then();
          }, 3000);
        } else {
          const hide = Popup.show({
            detail: "申请失败，请稍后再试",
          });
          const timer = setTimeout(() => {
            hide();
            clearTimeout(timer);
          }, 3000);
        }
      },
      onError() {
        const hide = Popup.show({
          detail: "网络错误，请稍后再试",
        });
        const timer = setTimeout(() => {
          hide();
          clearTimeout(timer);
        }, 3000);
      }
    }
  )
  const handleChange = async () => {
    if (!isScrolling) {
      setShowPicker(false);
      if (data) {
        const date = data.data.detail[dateIndex];
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

        //  处理时间为秒计数
        const {begin_time: old_begin, end_time: old_end} = genSeconds(date_part)

        await mutateChange({
          old: {
            activity_id: Number(activity_id),
            begin_time: old_begin,
            end_time: old_end
          },
          new: {
            activity_id: Number(activity_id),
            begin_time: timePart.begin_time,
            end_time: timePart.end_time
          },
        });
      }
    }
  }

  if (isLoading) return <Placeholder title="修改班次"/>;
  if (isError) return <Placeholder title="修改班次" isError/>;

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background={BACKGROUND}/>

      <View className={styles.volunteer}>
        <View className={styles.header}>
          <Text>{name}</Text>
        </View>
        <Text className={styles.info}>活动组织：{team_name}</Text>
        <Text className={styles.info}>
          活动时间：{start_date} - {last_date}
        </Text>
      </View>

      <View className={styles.time_picker}>
        <View className={styles.time_header}>
          <Text className={styles.time_header_desc}>活动班次</Text>
          <Text className={styles.time}>{date} {timePart}</Text>
        </View>

        {pickerValue ? (
          <PickerTimeBasic
            format={'Y.M'}
            value={pickerValue}
            onTimeChange={timeChange}
            onPickStart={() => setIsScrolling(true)}
            onPickEnd={() => setIsScrolling(false)}
            dateIndex={dateIndex}
          />
        ) : null}

      </View>

      <Text className={styles.hint}>
        温馨提示：修改班次后会导致报名顺序重置
      </Text>

      <Button className={styles.btn} onClick={handleChange}>
        确认修改
      </Button>

      <Popup.Comp/>

    </View>
  )
}

export default VolunteerChangeTime;