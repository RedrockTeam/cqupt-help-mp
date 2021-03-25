// /*  @typescript-eslint/camelcase */
import React, {useState} from "react";
import {Button, Image, Text, View} from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Taro, {useRouter} from "@tarojs/taro";
import {useUserInfo} from "@/stores/user";
import copyPng from "@/static/images/volunteer-copy.png";
import {useQuery} from "react-query/dist/react-query.production.min";
import styles from "./index.module.scss";
import {postVolunteerActivityRead} from "../../services";
import ActionSheet from "../../components/actionSheet/index";
import {navTo, resolvePage} from "@/common/helpers/utils";


const PAGE_TITLE = "报名结果";

export interface Params extends Record<string, string> {
  name: string;
  team_name: string;
  start_date: string;
  last_date: string;
  concat: string;
  pass: string;
  date: string;
  registration_time: string;
}

const VolunteerApply = () => {
  const params: Params = useRouter().params as Params;
  const {name, pass, concat, date, registration_time, team_name, start_date, last_date} = params;
  const {realName} = useUserInfo();

  //  管理ActionSheet的状态
  const [showSheet, setShowSheet] = useState(false);
  const handleShowSheet = () => {
    setShowSheet(true);
  };
  const cancelShowSheet = () => {
    setShowSheet(false);
  };

  useQuery(
    ["postVolunteerActivityRead", registration_time],
    postVolunteerActivityRead
  );

  const copy = () => {
    Taro.setClipboardData({
      data: concat,
    });
  };

  let desc, title;
  switch (pass) {
    case "0":
      desc = `录取正在进行中，请耐心等待结果～`
      title = {
        desc: '确定退出此活动？',
        detail: '退出活动后不可报名本活动'
      }
      break;
    case "1":
      desc = `恭喜您通过了${name}志愿活动，${date}的志愿报名，请你尽快加入到我们的志愿活动qq群，了解本次志愿活动的详细信息，群号为${concat}`;
      title = {
        desc: '确定退出此活动？',
        detail: '选择退出将会降低其他志愿活动录取概率'
      }
      break;

    default:
      desc =
        "很遗憾，您未成功抢到本次志愿活动的机会，不过也请不要气馁，时常查看”青协志愿者协会”或志愿者服务群，能快速获取志愿活动报名的时间，相信您下次一定能够成功参与志愿活动！";
      title = {
        desc: '确定退出此活动？',
        detail: '选择退出将会降低其他志愿活动录取概率'
      }
  }

  const handleChangeTime = () => {
    // console.log('click')
    // const hidePop = Popup.show({
    //   title: "申请成功",
    //   detail: "申请结果将会通过重邮小帮手进行通知",
    // })
    // setTimeout(() => {
    //   hidePop()
    // }, 3000)
    navTo({
      url: `${resolvePage(
        "volunteer",
        "change-time"
      )}?name=${name
      }&team_name=${team_name
      }&start_date=${start_date
      }&last_date=${last_date}`,
    });
    console.log(start_date+'-'+last_date)
  }
  const handleQuit = () => {
    console.log('quit');
    handleShowSheet()
  }
  const handleActionClick = (text, index) => {
    console.log('text:', text)
    console.log('index:', index)
  }
  const handleCancel = () => {
    console.log('cancel');
    cancelShowSheet()
  }


  // const [mutateApply] = useMutation(applyVolunteerActivity, {
  //   onSuccess(res) {
  //     if (res.status === 10000) {
  //       const hide = Popup.show({
  //         title: "申请成功",
  //         detail: "申请结果将会通过重邮小帮手进行通知",
  //         img: wait,
  //       });
  //       setTimeout(() => {
  //         hide();
  //         navigateBack();
  //       }, 1500);
  //     } else {
  //       const hide = Popup.show({
  //         title: "申请失败",
  //         detail: "错误",
  //         img: error,
  //       });
  //       setTimeout(() => hide(), 1500);
  //     }
  //   },
  //   onError() {
  //     const hide = Popup.show({
  //       title: "申请失败",
  //       detail: "网络错误",
  //       img: error,
  //     });
  //     setTimeout(() => hide(), 1500);
  //   },
  // });


  // const handleApply = async () => {
  {/*  // if (!isScrolling) {*/
  }
  {/*  //   setShowPicker(false);*/
  }
  {/*  //   if (data) {*/
  }
  //   //     const date = data.data.detail[dateIndex];
  //   //     const timePart = date.time_part_info[timePartIndex];
  //   //     if (timePart.now >= timePart.max + 10) {
  //   //       const hide = Popup.show({
  //   //         title: "申请失败",
  //   //         detail: "报名人数已满",
  //   //         img: error,
  //   //       });
  {/*  //       setTimeout(() => hide(), 1500);*/
  }
  //   //       return;
  //   //     }
  //   //     await mutateApply({
  //   //       id: date.id,
  //   //       begin_time: timePart.begin_time,
  //   //       end_time: timePart.end_time,
  //   //     });
  //   //   }
  //   // } else {
  //   //   console.log("scrolling");
  //   // }
  //
  //   console.log('handle apply')
  // }


  // @ts-ignore
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9"/>
      <View className={styles.container}>
        {pass === "0" ? (
          <View className={styles.content}>
            <View className={styles.waiting_desc}>
              {desc}
            </View>
            <View className={styles.btnWrapper}>
              <Button className={`${styles.btn} ${styles.btn_quit}`}
                      onClick={handleQuit}
              >
                退出活动
              </Button>
              <Button className={`${styles.btn}`}
                      onClick={handleChangeTime}
              >
                换班申请
              </Button>
            </View>
          </View>
        ) : (
          <View className={styles.content}>
            <Text className={styles.appellation}>亲爱的{realName}同学:</Text>
            <View className={styles.desc}>
              {desc}
              {pass === "1" ? (
                <Image
                  src={copyPng}
                  className={styles.copyPng}
                  onClick={() => {
                    copy();
                  }}
                />
              ) : null}
            </View>
            <View className={styles.btnWrapper}>
              <Button className={`${styles.btn} ${styles.btn_quit}`}
                      onClick={handleQuit}
              >
                退出活动
              </Button>
              <Button className={`${styles.btn}`}
                      onClick={handleChangeTime}
              >
                换班申请
              </Button>
            </View>
          </View>
        )}
      </View>

      <ActionSheet
        visible={showSheet}
        itemList={['确认']}
        onClick={handleActionClick}
        onCancel={handleCancel}
        showCancel={true}
        showTitle={true}
        title={title}
      />

    </View>
  );
};

export default VolunteerApply;
