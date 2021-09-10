import React, { useState } from "react";
import { Image, OpenData, Text, View } from "@tarojs/components";
import { navTo, resolvePage } from "@/common/helpers/utils";
import request from "@/common/helpers/request";
import avator from "@/static/images/empty.png";
import aboutIcon from "@/static/images/about-icon.png";
import loginOut from "@/static/images/login-out-icon.png";
import feedbackIcon from "@/static/images/feedback-icon.png";
import ticketAppeal from "@/static/images/ticketappeal-icon.png";
import enter from "@/static/images/campus-enter-icon.png";
import ticketIcon from "@/static/images/ticket-icon.png";
import campusIcon from "@/static/images/campus-icon.png";
import prizeIcon from "@/static/images/prize-icon.png";
import { useUserInfo } from "@/stores/user";
import { redirectTo, useDidShow, scanCode } from "@tarojs/taro";
import styles from "./index.module.scss";
import { useMutation } from "react-query/dist/react-query.production.min";
import { getMyVolunteerReads , getMyActivityReads} from "../../services";
import Placeholder from "@/common/components/placeholder";

function MyIndex() {
  const userInfo = useUserInfo();
  const [showPop, setshowPop] = useState(false);
  const [myVolunteerReadsRes, setMyVolunteerReadsRes] = useState(null);
  const [myActivityReadsRes, setMyActivityReadsRes] = useState(null);

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const handleLoginout = async () => {
    const res = await request("https://be-prod.redrock.cqupt.edu.cn/magicloop/unbind/xcx");
    if (res.status === 10000) {
      redirectTo({
        url: resolvePage("index", "bind"),
      });
    }
  };
  // const [mutateVolunteerReadRes] = useMutation(getMyVolunteerReads, {
  //   onSuccess(myReadsRes) {
  //     setMyVolunteerReadsRes(myReadsRes.data);
  //     setLoading(false);
  //   },
  //   onError() {
  //     setError(true)
  //   }
  // })
  const [mutateActivityReadRes] = useMutation(getMyActivityReads, {
    onSuccess(myReadsRes) {
      setMyActivityReadsRes(myReadsRes.data);
      setLoading(false);
    },
    onError() {
      setError(true)
    }
  })
  useDidShow(() => {
    // mutateVolunteerReadRes();
    mutateActivityReadRes()
  })

  if (isLoading) {
    return (
      <View className={styles.holder}>
        <Placeholder/>
      </View>
    )
  }
  if (isError || !myActivityReadsRes)
    return <Placeholder isError/>;


  // const [number, unread] = [myVolunteerReadsRes.number + myActivityReadsRes.number , myVolunteerReadsRes.un_read + myActivityReadsRes.un_read]
  const [number, unread] = [ myActivityReadsRes.number , myActivityReadsRes.un_read]

  console.log(number,unread);
  return (
    <View className={styles.wrapper}>
      <View className={styles.top}>
        <View className={styles.top_top}>
          <View>
            <OpenData
              className={styles.avator}
              type="userAvatarUrl"
              defaultAvatar={avator}
            />
          </View>
          <View className={styles.top_left}>
             <View className={styles.name}>{userInfo.realName}</View>
             <View className={styles.info}>学号：{userInfo.stuNum}</View>
             {/*<View className={styles.info}>专业：{userInfo.college}</View>*/}
          </View>
        </View>
        <View className={styles.top_bottom}>
          <View onClick={() => navTo({ url: resolvePage("my", "my-reward") })}>
            <Image className={styles.pic1} src={prizeIcon} />
            <View className={styles.desc}>
              <Text className={styles.text}>我的奖品</Text>
            </View>
          </View>
          <View
            onClick={() => navTo({ url: resolvePage("my", "my-activity") })}
          >
            {unread ? (
              <View className={styles.hint_point}>{unread}</View>
            ) : null
            }
            <Image className={styles.pic2} src={campusIcon}/>
            <View className={styles.desc}>
              <Text className={styles.text}>
                我的活动
              </Text>
              <Text className={styles.hint_number}>{number}</Text>
              {/*{*/}
              {/*  number === 0 ? (*/}
              {/*    <Text className={styles.hint_number}>0</Text>*/}
              {/*  ) : (*/}
              {/*    <Text className={styles.hint_number}>0</Text>*/}
              {/*  )*/}
              {/*}*/}
            </View>
          </View>
          <View
            onClick={() => navTo({ url: resolvePage("ticket", "my-ticket") })}
          >
            <Image className={styles.pic3} src={ticketIcon} />
            <View className={styles.desc}>
              <Text className={styles.text}>我的影票</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.list}>
        <View
          className={styles.feedback}
          onClick={() => navTo({ url: resolvePage("feedback", "edit") })}
        >
          <Image src={feedbackIcon} className={styles.icon} />
          <Text className={styles.text}>意见反馈</Text>
          <Image src={enter} className={styles.enter} />
        </View>
        <View
          className={styles.feedback}
          onClick={() =>
            navTo({ url: resolvePage("ticket-appeal", "home-list") })
          }
        >
          <Image src={ticketAppeal} className={styles.icon} />
          <Text className={styles.text}>影票申诉</Text>
          <Image src={enter} className={styles.enter} />
        </View>
        <View
          className={styles.about}
          onClick={() =>
            navTo({
              url: "https://redrock.team/#/",
              payload: { title: "红岩网校 - 关于我们" },
            })
          }
        >
          <Image src={aboutIcon} className={styles.icon} />
          <Text className={styles.text}>关于我们</Text>
          <Image src={enter} className={styles.enter} />
        </View>
      </View>
      <View className={styles.listAccount}>
        <View
          className={styles.loginOut}
          onClick={() => navTo({ url: resolvePage("account-safe", "index") })}
        >
          <Image className={styles.icon} src={loginOut} />
          <Text className={styles.text}>账号安全</Text>
          <Image src={enter} className={styles.enter} />
        </View>
        <View className={styles.loginOut} onClick={() => setshowPop(true)}>
          <Image className={styles.icon} src={loginOut} />
          <Text className={styles.text}>切换账号</Text>
        </View>
      </View>
      <View>
        <View
          className={styles.cover}
          style={showPop ? null : "display:none;"}
        />
        <View className={showPop ? styles.popWindowActive : styles.popWindow}>
          <View className={styles.title}>确定退出当前账号？</View>
          <View className={styles.confirm} onClick={() => handleLoginout()}>
            确定
          </View>
          <View className={styles.cancel} onClick={() => setshowPop(false)}>
            取消
          </View>
        </View>
      </View>
    </View>
  );
}


export default MyIndex;
