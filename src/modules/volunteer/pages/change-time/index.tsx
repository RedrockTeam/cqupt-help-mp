import React, {useState} from "react";
import {Params} from "@/modules/volunteer/pages/application";
import {useRouter} from "@tarojs/taro";
import {Button, ITouchEvent, Text, View} from "@tarojs/components";
import styles from "@/modules/volunteer/pages/change-time/index.module.scss";
import NavBack from "@/common/components/nav-back";
import {useQuery} from "react-query/dist/react-query.production.min";
import {getVolunteerActivityDetail} from "@/modules/volunteer/services";
import error from "@/static/images/error.png";
import Placeholder from "@/common/components/placeholder";
import {useContainer} from "unstated-next";
import PopupContext from "@/stores/popup";
import PickerTimeBasic from "@/modules/volunteer/components/picker-time-basic";
import {
  timestampToMDString,
  timetampToHMString
} from "@/common/helpers/date";


const PAGE_TITLE = '修改班次'

const VolunteerChangeTime = () => {
  let { name, team_name, start_date, last_date, rely_id, date: date_part } = useRouter().params as Params;

  console.log('date_part:', date_part)

  name='name'
  team_name='team_name'
  start_date='2020.11.12'
  last_date='2020.11.18'
  date_part='11月13日 10:00-12:00'



  // picker
  const Popup = useContainer(PopupContext);
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [date, setDate] = useState<string>(date_part.split(' ')[0])
  const [timePart, setTimePart] = useState<string>(date_part.split(' ')[1])
  const [timePartIndex, setTimePartIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [ , setShowPicker] = useState(true);


  let { data, isLoading, isError } = useQuery(
    ["getVolunteerActivityDetail", rely_id],
    getVolunteerActivityDetail
  );

  if (isLoading) return <Placeholder title="修改班次" />;
  if (isError || !data) return <Placeholder title="修改班次" isError />;

  // mock data
  data.data = {
    "name": "测试",
    "team_name": "红岩网校工作站—Web研发部",
    "description": "param test",
    "role": "红岩网校工作站",
    "sign_up_start": 1615996800,
    "sign_up_last": 1615996800,
    "hour": "1",
    "last_date": 1685996800,
    "start_date": 1615996800,
    "num": "1-2人",
    "imagines": "[\"https://www.bilibili.com/\",\"https://www.bilibili.com/\"]",
    "need_additions": "[1,2,5,7]",
    "detail": [
      {
        "id": 1,
        "date": 1615996800,
        "time_part_info": [
          {
            "begin_time": 3600,
            "end_time": 3720,
            "now": 0,
            "max": 0
          },
          {
            "begin_time": 7200,
            "end_time": 25440,
            "now": 0,
            "max": 0
          }
        ]
      }
    ]
  }

  /**
   * 生成picker表头时间字符串
   * @param data          后端返回的data
   * @param dateIndex     number
   * @param timePartIndex number
   */
  const gen_date_str = (data, dateIndex, timePartIndex) => {
    let date = data.data.detail[dateIndex];
    const timePart = date.time_part_info[timePartIndex];

    console.log('date:', date)

    date = timestampToMDString(date.date);
    setDate(date)
    setTimePart(`${timetampToHMString(timePart.begin_time)} - ${timetampToHMString(timePart.end_time)}`)
    console.log('date:', date)
    console.log('time:', `${timetampToHMString(timePart.begin_time)} - ${timetampToHMString(timePart.end_time)}`)
  }



  // let info = null;
  let pickerValue;
  if (data) {
    // info = data.data;
    const dateList = data.data.detail.map((item) => item.date);
    const timePartList = data.data.detail.map((item) => item.time_part_info);
    pickerValue = {
      dateList,
      timePartList,
    };
  }



  const timeChange = (e: ITouchEvent) => {
    const dateIndex = e.detail.value[0]; // 要更改才生效
    const timePartIndex = e.detail.value[1]; // 要更改才生效
    setDateIndex(dateIndex);
    setTimePartIndex(timePartIndex);

    gen_date_str(data, dateIndex, timePartIndex)

    console.log('dateIndex:', dateIndex)
    console.log('timePartIndex:', timePartIndex)

  };

  async function mutateApply(params: {end_time: any; begin_time: any; id: any}) {
    console.log('mutateApply');
  }

  const handleApply = async () => {
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
        await mutateApply({
          id: date.id,
          begin_time: timePart.begin_time,
          end_time: timePart.end_time,
        });
      }
    }
  }


  const handleChange = () => {
    const hide = Popup.show({
      detail: "修改成功!"
    })
    const timer = setTimeout(() => {
      hide();
      clearTimeout(timer);
    }, 1500);
  }


  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9"/>

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

        <PickerTimeBasic
          format={'Y.M'}
          value={pickerValue}
          onTimeChange={timeChange}
          onPickStart={() => setIsScrolling(true)}
          onPickEnd={() => setIsScrolling(false)}
          dateIndex={dateIndex}
        />
      </View>

      <Text className={styles.hint}>
        温馨提示：修改班次后会导致报名顺序重置
      </Text>

      <Button className={styles.btn} onClick={handleChange}>
        确认修改
      </Button>

      <Popup.Comp />

    </View>
  )
}

export default VolunteerChangeTime;
