// /*  @typescript-eslint/camelcase */
import React, {useState} from "react";
import {Button, Image, Text, View} from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Taro, {navigateBack, scanCode, useRouter} from "@tarojs/taro";
import {useUserInfo} from "@/stores/user";
import copyPng from "@/static/images/volunteer-copy.png";
import scanPng from "@/static/images/scan-code.png";
import {useQuery} from "react-query/dist/react-query.production.min";
import styles from "./index.module.scss";
import {postVolunteerActivityChange, postVolunteerActivityQuit, postVolunteerActivityRead} from "../../services";
import ActionSheet from "../../components/actionSheet/index";
import {navTo, resolvePage} from "@/common/helpers/utils";
import PopupContext from "@/stores/popup";
import {useContainer} from "unstated-next";
import {useMutation} from "react-query";
import {genSeconds} from "@/common/helpers/date";


const PAGE_TITLE = "报名结果";
const NAV_BACKGROUND = '#F6F6F9';

const KEY_QUIT = 'quit';
const KEY_CHANGE_TIME = 'change-time';


const MutateConfig = (Popup, successFunc, ifBack: boolean) => {
  return {
    onSuccess(res) {
      if (res.status === 10000) {
        const hide = Popup.show({
          detail: "请尽快与本次志愿活动qq群群\n" +
            "管理员取得联系，并等待管理\n" +
            "员的审核！",
        });
        const timer = setTimeout(() => {
          hide();
          clearTimeout(timer);

          //  用户自定义的成功执行函数
          successFunc(res);


          ifBack ? navigateBack() : null;
        }, 3000);
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
  }
}


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
}

const VolunteerApply = () => {
  const params: Params = useRouter().params as Params;
  const {name, pass, concat, date, registration_time, team_name, start_date, last_date, activity_id} = params;
  const {realName} = useUserInfo();


  //  已读状态管理
  useQuery(
    ["postVolunteerActivityRead", registration_time],
    postVolunteerActivityRead
  );
  //  复制群号util
  const copy = () => {
    Taro.setClipboardData({
      data: concat,
    });
  };


  //  管理ActionSheet的状态
  const [showSheet, setShowSheet] = useState<boolean>(false);
  const [sheetKey, setSheetKey] = useState<string | Symbol>(KEY_QUIT);
  const [sheetTitle, setSheetTitle] = useState<{ desc: string, detail: string }>(
    pass === '0' ?
      {
        desc: '确定退出此活动？',
        detail: '选择退出将会降低其他志愿活动录取概率'
      } : {
        desc: '确定退出此活动？',
        detail: '退出活动后不可报名本活动'
      });
  const handleShowSheet = (key: string | Symbol) => {

    setSheetKey(key)


    if (key === KEY_QUIT) {
      setSheetTitle({
        desc: '确定退出此活动？',
        detail: '选择退出将会降低其他志愿活动录取概率'
      })
    } else if (key === KEY_CHANGE_TIME) {
      setSheetTitle({
        desc: '确定申请更改班次？',
        detail: '换班后不可再换班或退出活动，\n' +
          '并会影响你在其它志愿活动中的录取概率'
      })
    }

    setShowSheet(true);
  };
  const cancelShowSheet = () => {
    setShowSheet(false);
  };


  let desc;
  switch (pass) {
    case "0":
      desc = `录取正在进行中，请耐心等待结果～`
      break;
    case "1":
      desc = `恭喜您通过了${name}志愿活动，${date}的志愿报名，请你尽快加入到我们的志愿活动qq群，了解本次志愿活动的详细信息，群号为${concat}`;
      break;

    default:
      desc =
        "很遗憾，您未成功抢到本次志愿活动的机会，不过也请不要气馁，时常查看”青协志愿者协会”或志愿者服务群，能快速获取志愿活动报名的时间，相信您下次一定能够成功参与志愿活动！";
  }

  const Popup = useContainer(PopupContext);


  //  dispatch change time req
  const [mutateChange] = useMutation(postVolunteerActivityChange, MutateConfig(Popup, () => {
  }, false))

  const handleChangeTime = async () => {
    // console.log('click')
    // const hidePop = Popup.show({
    //   title: "申请成功",
    //   detail: "申请结果将会通过重邮小帮手进行通知",
    // })
    // setTimeout(() => {
    //   hidePop()
    // }, 3000)

    //  TODO: 根据录取结果是否确认来采用不同的策略:
    //        等待录取则进入换班次页面
    //        录取则popup提示
    if (pass === '0') {             //  等待结果的情况下
      navTo({
        url: `${resolvePage(
          "volunteer",
          "change-time"
        )}?name=${name
        }&team_name=${team_name
        }&start_date=${start_date
        }&last_date=${last_date
        }&date=${date}`,
      });
    } else if (pass === '1') {      //  成功录取的情况下


      const {begin_time, end_time} = genSeconds(date)

      await mutateChange({
        old: {
          activity_id: Number(activity_id),
          begin_time,
          end_time,
        },
        new: {
          activity_id: Number(activity_id),
          begin_time: 0,
          end_time: 0
        }
      })
    }
  }


  //  dispatch quit req
  const [mutateQuit] = useMutation(postVolunteerActivityQuit, MutateConfig(Popup, ()=>{}, true))

  const handleQuit = async () => {
    console.log('quit');

    const {begin_time, end_time} = genSeconds(date)

    await mutateQuit({
      activity_id: Number(activity_id),
      begin_time,
      end_time,
    })

  }


  //  actionSheet handle hook
  // @ts-ignore
  const handleActionClick = (text, index, key) => {

    if (key === KEY_CHANGE_TIME) {
      handleChangeTime();
    } else if (key === KEY_QUIT) {
      handleQuit();
    }
  }
  const handleCancel = () => {
    console.log('cancel');
    cancelShowSheet()
  }


  //  扫码签到
  const [isScanned, setIsScanned] = useState<boolean>(false)
  const [scanText, setScanText] = useState<string>('扫码签到')
  const mutateScan = async (res) => {
    await console.log('mutateScan:', res)


    setIsScanned(true);
    setScanText('签到成功');
  }

  const handleScan = async () => {
    scanCode({
      async success({result}) {
        await mutateScan(result);


        const hide = Popup.show({
          detail: '签到成功！'
        })
        const timer = setTimeout(() => {
          hide();
          clearTimeout(timer);
        }, 1500)
      },
      fail() {
        const hide = Popup.show({
          detail: '请扫描本次志愿活动的二维码！'
        })
        const timer = setTimeout(() => {
          hide();
          clearTimeout(timer);
        }, 1500)
      }
    });
  };


  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background={NAV_BACKGROUND}/>
      <View className={styles.container}>
        <View className={styles.content}>
          {pass === '0' ?
            //  等待录取结果 ing
            (
              <View className={styles.waiting_desc}>
                {desc}
              </View>
            )
            : (
              <View className={styles._content}>
                {pass === '1' ? (
                  //  扫码签到
                  <View className={styles.scan}
                        onClick={handleScan}>
                    {!isScanned ? (<Image src={scanPng} className={styles.scan_png}/>) : null}
                    <Text className={isScanned ? styles.scan_text_suc : styles.scan_text_un}>{scanText}</Text>
                  </View>
                ) : null}
                <Text className={styles.appellation}>亲爱的{realName}同学:</Text>
                <View className={styles.desc}>
                  {/*区别 已录取 与 未录取*/}
                  {pass === '1' ?
                    (
                      <Text>
                        {`恭喜您通过了${name}志愿活动`}
                        {/* TODO: 根据是否修改过班次来确认时间段的样式}*/}
                        <Text className={true ? styles.time_out : null}>
                          {date}
                        </Text>
                        {`的志愿报名，请你尽快加入到我们的志愿活动qq群，了解本次志愿活动的详细信息，群号为${concat}`}

                      </Text>
                    )
                    : desc}
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
            )
          }

          {!isScanned ? (
            <View className={styles.btnWrapper}>
              <Button className={`${styles.btn} ${styles.btn_quit}`}
                      onClick={() => handleShowSheet(KEY_QUIT)}
              >
                退出活动
              </Button>
              <Button className={`${styles.btn}`}
                      onClick={() => handleShowSheet(KEY_CHANGE_TIME)}
              >
                换班申请
              </Button>
            </View>
          ) : (
            // TODO：根据 在 已录取 情况下是否修改的状态来添加提示按钮
            <View className={styles.btnWrapper}>
              <Button className={`${styles.btn} ${styles.btn_waiting}`}>
                管理员审核中
              </Button>
            </View>
          )}
        </View>
      </View>

      <ActionSheet
        sheetKey={sheetKey}
        visible={showSheet}
        itemList={['确认']}
        onClick={handleActionClick}
        onCancel={handleCancel}
        showCancel={true}
        showTitle={true}
        title={sheetTitle}
      />

      <Popup.Comp/>
    </View>
  );
};

export default VolunteerApply;
