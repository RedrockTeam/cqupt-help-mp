import React, { useRef, useState } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import { useMutation, useQuery } from "react-query/dist/react-query.production.min";
import LoadingPage from '../../components/Loding/index.jsx';
import CheckInput from '../../components/Checkinput/index.jsx';
import { getQuesAndEmailState, getPasswordState } from '../../services/index.ts';
import cancel from '@/static/images/cancel.png';
import reset from "@/static/images/reset.png";
import robSuccess from '@/static/images/rob-success.png';
import styles from './index.module.scss';
import request from "@/common/helpers/request";
import { useUserInfo } from "@/stores/user";
import { resolvePage, navTo } from "@/common/helpers/utils";

const ForgetPassword = () => {
    const { token } = useUserInfo();
    const { stuNum } = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[0]))));
    const [countdown, setcountdown] = useState(60);
    const [Index, setIndex] = useState(0);
    const [stuId, setstuId] = useState(null)
    const [showPopSame, setshowPopSame] = useState(false);
    const [showPopCheck, setshowPopCheck] = useState(false);
    const { data, isLoading, isError } = useQuery(
        [stuNum],
        getQuesAndEmailState
    );
    //计时器内容
    let timeChange, ti = countdown;
    const clock = () => {
        if (ti > 0) {
            //当ti>0时执行更新方法
            ti = ti - 1;
            setcountdown(ti);
        } else {
            //当ti=0时执行终止循环方法
            clearInterval(timeChange);
        }
    };
    const sendCode = () => {
        //每隔一秒执行一次clock方法
        timeChange = setInterval(clock, 1000);
    };
    //验证原密码
    const [mutateOrigin] = useMutation(getPasswordState)
    const handleOrigin = async () => {
        const res = await mutateOrigin(stuNum, {
            onSuccess: (res) => {
                if (res.status == 10000) {
                    setshowPopSame(true);
                    setTimeout(() => {
                        setshowPopSame(false)
                    }, 1500)
                } else if (res.status == 10001) {
                    setshowPopCheck(true);
                }
            }
        })
    }
    return (
        <View>
            {!isLoading ? <View>
                <View>
                    <View className={styles.list}>
                        <View className={styles.title}>
                            <Image src={reset} className={styles.reset} />
                            <Text>账号</Text>
                        </View>
                        <View className={styles.input}>
                            <Input onInput={(e) => setstuId(e.detail.value)} type="number" className={styles.inputcontent} placeholder="请输入学号" />
                        </View>
                        <Button className={stuId ? styles.nextActive : styles.next} onClick={handleOrigin}>确定</Button>
                    </View>
                    <View>
                        <View className={styles.cover} style={showPopCheck ? null : "display:none"} />
                        <View className={showPopCheck ? styles.popWindowActive : styles.popWindow}>
                            <View className={styles.title}>请选择验证方式</View>
                            <Image src={cancel} className={styles.cancel} onClick={() => { setshowPopCheck(false); }} />
                            <View className={styles.quesList}>
                                <View onClick={() => navTo({ url: resolvePage("account-safe", "checkprotect") })} style={data.data.question_is ? null : "display:none"}>验证密保</View>
                                <View onClick={() => navTo({ url: resolvePage("account-safe", "checkcode") })} style={data.data.email_is ? null : "display:none"}>验证邮箱</View>
                            </View>
                        </View>
                    </View>
                </View>
                {showPopSame ?
                    <View>
                        <View className={styles.cover} />
                        <View className={styles.popup}>
                            <Image src={robSuccess} className={styles.success} />
                            <Text className={styles.txt}>
                                您的密码未曾更改哦，试试初始密码登录吧！</Text>
                        </View>
                    </View> : null}
            </View> : <LoadingPage isError={isError} />}
        </View>
    )
}


export default ForgetPassword;