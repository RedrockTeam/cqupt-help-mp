import React, {useState} from "react";
import {Button, Image, Text, View} from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Taro, {navigateBack, scanCode, useDidShow, useRouter,} from "@tarojs/taro";
import {useUserInfo} from "@/stores/user";
import copyPng from "@/static/images/volunteer-copy.png";
import scanPng from "@/static/images/scan-code.png";
import {navTo, resolvePage} from "@/common/helpers/utils";
import PopupContext from "@/stores/popup";
import {useContainer} from "unstated-next";
import {useMutation} from "react-query";
import {genSeconds, timestampToMDString} from "@/common/helpers/date";
import {getMyActivities} from "@/modules/my/services";
import {
  postVolunteerActivityChange,
  postVolunteerActivityQuit,
  postVolunteerActivityRead,
  postVolunteerActivitySignIn,
} from "../../services";
import styles from "./index.module.scss";
import ActionSheet from "../../components/actionSheet/index";

const PAGE_TITLE = "报名结果";
const NAV_BACKGROUND = "#F6F6F9";

const KEY_QUIT = "quit";
const KEY_CHANGE_TIME = "change-time";

//  判断当前时间是否在签到开始前后15min内
const timeLegal = (date: string) => {
  const nowStamp = Date.parse(new Date() as any) / 1000;
  let nowDate = timestampToMDString(nowStamp);
  // nowDate = nowDate.split('月')[0].length < 2 ? '0' + nowDate : nowDate;
  // nowDate = nowDate.split('月')[0].split('日')[0].length < 2 ? nowDate.split('月')[0] + '月' + '0' + nowDate.split('月')[1]: nowDate;
  const _date = date.split(" ")[0];

  if (parseInt(_date.split('月')[0]) !== parseInt(nowDate.split('月')[0])
    || parseInt(_date.split('月')[1].split('日')[0]) !== parseInt(nowDate.split('月')[1].split('日')[0])) return false;

  // @ts-ignore
  const _time = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
  const dif = nowStamp - _time;
  console.log('dif:', dif)

  const {begin_time} = genSeconds(date);
  console.log('begin_time:', begin_time)
  const dif_minute = (dif - begin_time) / (60 * 15);
  return !(dif_minute > 1 || dif_minute < -1);
};

const MutateConfig = (Popup, successFunc, ifBack: boolean, detail: string) => {
  return {
    onSuccess(res) {
      console.log('onSuccess', res);
      if (res.status === 10000) {
        const hide = Popup.show({
          detail,
        });
        const timer = setTimeout(() => {
          hide();
          clearTimeout(timer);

          //  用户自定义的成功执行函数
          successFunc(res);

          ifBack ? navigateBack() : null;
        }, 1500);
      } else {
        const hide = Popup.show({
          detail: "申请失败，请稍后再试",
        });
        const timer = setTimeout(() => {
          hide();
          clearTimeout(timer);
        }, 1500);
      }
    },
    onError() {
      const hide = Popup.show({
        detail: "网络错误，请稍后再试",
      });
      const timer = setTimeout(() => {
        hide();
        clearTimeout(timer);
      }, 1500);
    },
  };
};

export interface Params extends Record<string, string> {
  name: string;
  team_name: string;
  start_date: string;
  last_date: string;
  concat: string;
  pass: string;
  date: string;
  registration_time: string;
  activity_id: string;
  rely_id: string;
  is_change: "0" | "1" | "2";
  is_sign: "0" | "1";
}

const VolunteerApply = () => {
  const params: Params = useRouter().params as Params;
  const {
    rely_id,
    is_change,
    name,
    pass : pass_state,
    concat,
    date,
    registration_time,
    team_name,
    start_date,
    last_date,
    activity_id,
    is_sign,
  } = params;
  const {realName} = useUserInfo();

  //  管理签到状态
  const [isScanned, setIsScanned] = useState<boolean>(is_sign === "1");
  const [scanText, setScanText] = useState<string>(is_sign === '1' ? "签到成功" :"扫码签到");

  //  管理是否更改班次的状态
  const [changeState, setChangeState] = useState<string>(is_change);

  // 管理 pass 字段的状态
  // TODO: 因为后端在更换班次之后，pass字段总是为''
  const [pass, setPass] = useState<'0' | '1' | '2'>(pass_state === '' ? '0' : pass_state as '1' | '2');

  // 每次回到该页面时，更新 is_scan 、is_change 、pass 字段
  const [mutateGetMyActivities] = useMutation(getMyActivities, {
    onSuccess(data) {
      console.log("getMyActivities-data:", data);

      if (data?.data) {
        const tarActivity = data.data.filter(({activity_detail: activity}) => {
          const {begin_time, end_time} = genSeconds(date);
          return (
            activity.rely_id == Number(rely_id) &&
            activity.id == Number(activity_id) &&
            activity?.time_part?.begin_time == begin_time &&
            activity?.time_part?.end_time == end_time
          );
        });
        console.log(tarActivity);
        if (
          changeState != String(tarActivity[0].activity_detail.status.is_change) ||
          isScanned != (tarActivity[0].activity_detail.status.is_sign === 1)
        ) {
          setChangeState(String(tarActivity[0].activity_detail.status.is_change));
          setIsScanned(tarActivity[0].activity_detail.status.is_sign === 1);
          setPass(tarActivity[0].activity_detail.result.pass ? tarActivity[0].activity_detail.result.pass : '0');
        }
      }
    },
  });
  //  已读状态管理
  const [mutationPostActivityRead] = useMutation(postVolunteerActivityRead, {})
  useDidShow(() => {
    mutateGetMyActivities().then();
    mutationPostActivityRead({
      registration_time
    }).then();
  });

  //  复制群号util
  const copy = () => {
    Taro.setClipboardData({
      data: concat,
    }).then();
  };

  //  管理ActionSheet的状态
  const [showSheet, setShowSheet] = useState<boolean>(false);
  const [sheetKey, setSheetKey] = useState<string | symbol>(KEY_QUIT);
  const [sheetTitle, setSheetTitle] = useState<{
    desc: string;
    detail: string;
  }>(
    pass === "1"
      ? {
        desc: "确定退出此活动？",
        detail: "选择退出将会降低其他志愿活动录取概率",
      }
      : {   //  pass === '0'
        desc: "确定退出此活动？",
        detail: "退出活动后不可报名本活动",
      }
  );

  // console.log('pass:', pass)
  // console.log('sheetTitle:', sheetTitle)

  const handleShowSheet = (key: string | symbol) => {
    if (isScanned) return;

    setSheetKey(key);

    if (key === KEY_QUIT) {
      setSheetTitle(pass === "1"
        ? {
          desc: "确定退出此活动？",
          detail: "选择退出将会降低其他志愿活动录取概率",
        }
        : {   //  pass === '0'
          desc: "确定退出此活动？",
          detail: "退出活动后不可报名本活动",
        });
    } else if (key === KEY_CHANGE_TIME) {
      setSheetTitle({
        desc: "确定申请更改班次？",
        detail:
          "换班后不可再换班或退出活动，\n" +
          "并会影响你在其它志愿活动中的录取概率",
      });
    }

    setShowSheet(true);
  };
  const cancelShowSheet = () => {
    setShowSheet(false);
  };

  let desc;
  switch (pass) {
    case "0":
      desc = `录取正在进行中，请耐心等待结果～`;
      break;
    case "1":
      desc = `恭喜您通过了${name}志愿活动，${date}的志愿报名，请你尽快加入到我们的志愿活动qq群，了解本次志愿活动的详细信息，群号为${concat}`;
      break;
    case "2":
      desc =
        "很遗憾，您未成功抢到本次志愿活动的机会，不过也请不要气馁，时常查看”青协志愿者协会”或志愿者服务群，能快速获取志愿活动报名的时间，相信您下次一定能够成功参与志愿活动！";
      break;
  }

  const Popup = useContainer(PopupContext);

  //  dispatch change time req
  const [mutateChange] = useMutation(
    postVolunteerActivityChange,
    MutateConfig(
      Popup,
      () => {
      },
      false,
      pass === "1"
        ? "请尽快与本次志愿活动qq群群\n" +
        "管理员取得联系，并等待管理\n" +
        "员的审核！"
        : "您已成功退出本次活动。"
    )
  );

  const handleChangeTime = async () => {
    if (pass === "0") {
      //  等待结果的情况下
      const _date = date[0] === '0' ? date.slice(1) : date;
      navTo({
        url: `${resolvePage(
          "volunteer",
          "change-time"
        )}?name=${name
        }&team_name=${team_name
        }&start_date=${start_date
        }&last_date=${last_date
        }&date=${_date
        }&rely_id=${rely_id
        }&activity_id=${activity_id}`,
      });
    } else if (pass === "1") {
      //  成功录取的情况下
      const {begin_time, end_time} = genSeconds(date);
      await mutateChange({
        old: {
          activity_id: Number(activity_id),
          begin_time,
          end_time,
        },
        new: {
          activity_id: Number(activity_id),
          begin_time: 0,
          end_time: 0,
        },
      });
    }
  };
  //  点击换班按钮触发事件
  const handleChangeTimeClick = async () => {
    if (pass === '1') {
      handleShowSheet(KEY_CHANGE_TIME);
    } else {
      //  pass === '0'
      await handleChangeTime();
    }
  }

  //  dispatch quit req
  const [mutateQuit] = useMutation(
    postVolunteerActivityQuit,
    MutateConfig(
      Popup,
      () => {
      },
      true,
      pass === "1"
        ? "请尽快与本次志愿活动qq群群\n" +
        "管理员取得联系，并等待管理\n" +
        "员的审核！"
        : "您已成功退出本次活动。"
    )
  );

  const handleQuit = async () => {
    console.log("quit");
    const {begin_time, end_time} = genSeconds(date);
    console.log(typeof begin_time, typeof end_time);
    await mutateQuit({
      activity_id: Number(activity_id),
      begin_time,
      end_time,
    });
  };

  //  actionSheet handle hook
  const handleActionClick = ({sheetKey}) => {
    console.log("sheetKey:", sheetKey);
    if (sheetKey === KEY_CHANGE_TIME) {
      cancelShowSheet();
      handleChangeTime().then();
    } else if (sheetKey === KEY_QUIT) {
      cancelShowSheet();
      handleQuit().then();
    }
  };
  const handleCancel = () => {
    cancelShowSheet();
  };

  //  扫码签到
  const [mutateScan] = useMutation(
    postVolunteerActivitySignIn,
    MutateConfig(
      Popup,
      () => {
        setIsScanned(true);
        setScanText("签到成功");
      },
      false,
      "签到成功！"
    )
  );
  const handleScan = async () => {
    if (!isScanned)
      scanCode({
        async success({result}) {
          console.log("scan-result:", result);
          // const param = result.split("?")[1];
          const {begin_time, end_time} = genSeconds(date);

          if (timeLegal(date)) {
            await mutateScan({
              code: `code=${activity_id}`,
              // code: param,
              data: {
                activity_id: Number(activity_id),
                begin_time,
                end_time,
              },
            });
          } else {
            handleMistakeScan("请在规定时间内扫码签到");
          }
        },
        fail() {
          handleMistakeScan("请扫描本次志愿活动的二维码");
        },
      }).then();
  };
  const handleMistakeScan = (detail: string) => {
    const hide = Popup.show({
      detail,
    });
    const timer = setTimeout(() => {
      hide();
      clearTimeout(timer);
    }, 1500);
  };

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background={NAV_BACKGROUND}/>
      <View className={styles.container}>
        <View className={styles.content}>
          {pass === "0" ? (
            //  等待录取结果 ing
            <View className={styles.waiting_desc}>{desc}</View>
          ) : (
            <View className={styles._content}>
              {pass === "1" ? (
                //  扫码签到
                <View className={styles.scan} onClick={handleScan}>
                  {!isScanned ? (
                    <Image src={scanPng} className={styles.scan_png}/>
                  ) : null}
                  <Text
                    className={
                      isScanned ? styles.scan_text_suc : styles.scan_text_un
                    }
                  >
                    {scanText}
                  </Text>
                </View>
              ) : null}
              <Text className={styles.appellation}>亲爱的{realName}同学:</Text>
              <View className={styles.desc}>
                {/* 区别 已录取 与 未录取 */}
                {pass === "1" ? (
                  <Text>
                    {`恭喜您通过了${name}志愿活动，`}
                    <Text
                      className={
                        changeState === "2" ? styles.time_out : styles.time
                      }
                    >
                      {date}
                    </Text>
                    的志愿报名，请你尽快加入到我们的志愿活动qq群，了解本次志愿活动的详细信息，群号为
                    <Text className={styles.concat}>{concat}</Text>
                  </Text>
                ) : (
                  desc
                )}
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
            </View>
          )}

          {pass === "2" ? null : changeState === "0" ? (
            <View className={styles.btnWrapper}>
              <Button
                className={`${styles.btn} ${styles.btn_quit}`}
                onClick={() => handleShowSheet(KEY_QUIT)}
              >
                退出活动
              </Button>
              <Button
                className={`${styles.btn}`}
                onClick={handleChangeTimeClick}
              >
                换班申请
              </Button>
            </View>
          ) : changeState === "1" ? (
            <View className={styles.btnWrapper}>
              <Button className={`${styles.btn} ${styles.btn_waiting}`}>
                管理员审核中
              </Button>
            </View>
          ) : (
            <Text className={styles.hint}>志愿服务班次已修改</Text>
          )}
        </View>
      </View>

      <ActionSheet
        sheetKey={sheetKey}
        visible={showSheet}
        itemList={["确认"]}
        onClick={handleActionClick as any}
        onCancel={handleCancel}
        showCancel
        showTitle
        title={sheetTitle}
      />

      <Popup.Comp/>
    </View>
  );
};

export default VolunteerApply;
