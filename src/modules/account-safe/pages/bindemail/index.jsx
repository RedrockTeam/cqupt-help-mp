import React, { useRef, useState, useEffect } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import { useMutation } from "react-query/dist/react-query.production.min";
import request from "@/common/helpers/request";
import reset from "@/static/images/reset.png";
import styles from "./index.module.scss";
import robSuccess from '@/static/images/rob-success.png'
import { resolvePage, navTo } from "@/common/helpers/utils";
import { sentEmailMessage, bindEmail } from '../../services/index.ts';
//TODO:倒计时发请求
const BindEmail = () => {
    const [countdown, setcountdown] = useState(5);
    const [emailFormat, setemailFormat] = useState(null);
    const [showMessage, setshowMessage] = useState(false);
    const [showBind, setshowBind] = useState(false);
    const [emailAddress, setemailAddress] = useState(0);
    const [VerificationCode, setverificationCode] = useState(null);
    const [Index, setIndex] = useState(0);
    const [emailCode, setemailCode] = useState(null);
    const [userCode, setuserCode] = useState(null);
    const [MessageInfor, setMessageInfor] = useState(null)
    const [PropmtMessage, setPropmtMessage] = useState("重新发送")
    //倒计时部分TODO:应该有更好的方法
    let timeChange, ti = countdown;
    const clock = () => {
        if (ti > 0) {
            //当ti>0时执行更新方法
            ti = ti - 1;
            setcountdown(ti);
            console.log(ti);
        } else {
            //当ti=0时执行终止循环方法
            console.log('zhongzhi')
            clearInterval(timeChange);
        }
    };
    const sendCode = () => {
        //每隔一秒执行一次clock方法
        console.log('hh')
        timeChange = setInterval(clock, 1000);
    };

    const handleFormat = (e) => {
        if (!e.detail.value.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/))
            setemailFormat(false);
        else {
            setemailAddress(e.detail.value);
            setemailFormat(true);
        }

    }
    const [mutateMessage] = useMutation(sentEmailMessage)
    const handleMessage = async () => {
        const res = await mutateMessage(emailAddress, {
            onSuccess: (res) => {
                if (res.status === 10000) {
                    setMessageInfor("已向您的邮箱发送一条验证码")
                    setshowMessage(true);
                    setTimeout(() => {
                        setshowMessage(false)
                        setIndex(1);
                        sendCode();
                    }, 2000);
                    setemailCode(res.data.code)
                } else if (res.status == 10022) {
                    setMessageInfor("邮箱格式信息错误")
                    setshowMessage(true);
                    setTimeout(() => {
                        setshowMessage(false)
                    }, 2000);
                } else if (res.status == 10009) {
                    setMessageInfor("发送邮箱次数限制")
                    setshowMessage(true);
                    setTimeout(() => {
                        setshowMessage(false)
                    }, 2000);
                }
            }
        });
    }
    const handleResent = async () => {
        if (countdown == 0 && PropmtMessage.includes("重新发送")) {
            const res = await mutateMessage(emailAddress, {
                onSuccess: (res) => {
                    if (res.status == 10000) {
                        setcountdown(5);
                        ti = 5;
                        sendCode();
                    } else if (res.status == 10009) {
                        setPropmtMessage("发送次数受限")
                    }
                }
            })
        }
    }
    const [mutateBind] = useMutation(bindEmail);
    const sendEmailAndCode = async () => {
        const res = await mutateBind({ emailAddress, userCode }, {
            onSuccess: (res) => {
                res.status = 10007;
                if (res.status === 10000) {
                    setshowBind(true);
                    setTimeout(() => {
                        setshowBind(false);
                        navTo({ url: resolvePage("account-safe", "index") });
                    }, 1500)
                } else if (res.status == 10007) {
                    setverificationCode(false)
                    setTimeout(() => {
                        setverificationCode(null);
                    }, 3000)
                }
            }
        })
    }
    //service
    return (
        <View>
            {Index == 0 ? <View className={styles.list}>
                <View className={styles.title}>
                    <Text>请输入您的邮箱地址</Text>
                </View>
                <View className={styles.input}>
                    <Input type="text" className={styles.inputcontent} placeholder="请输入你的邮箱地址" onInput={handleFormat} />
                </View>
                <Text className={styles.prompt}>{(emailFormat || emailFormat == null) ? null : "请输入正确的邮件地址"}</Text>
                <Text className={styles.contect} onClick={() => navTo({ url: resolvePage("feedback", "index") })}>绑定失败？联系我们</Text>
                <Button disabled={!emailFormat} className={emailFormat ? styles.nextActive : styles.next} onClick={handleMessage}> 下一步</Button>
                {showMessage ? <Text className={styles.message}>{MessageInfor}</Text> : null}
            </View> : null}
            {Index == 1 ? <View className={styles.list}>
                <View className={styles.title}>
                    <Text>请输入邮箱验证码</Text>
                </View>
                <View className={styles.input}>
                    <Input type="number" className={styles.inputcontent} placeholder="请输入验证码" onInput={(e) => setuserCode(e.detail.value)} />
                    <Text className={styles.resend} onClick={handleResent}>{countdown != 0 ? `已发送${countdown}` : PropmtMessage}</Text>
                </View>
                <Text className={styles.prompt}>{(VerificationCode || VerificationCode == null) ? null : "验证码错误"}</Text>
                <Text className={styles.contect} onClick={() => navTo({ url: resolvePage("feedback", "index") })}>绑定失败？联系我们</Text>
                <Button disabled={!userCode} className={userCode ? styles.nextActive : styles.next} onClick={sendEmailAndCode}>提交</Button>
                {showBind ?
                    <View>
                        <View className={styles.cover} />
                        <View className={styles.popup}>
                            <Image src={robSuccess} className={styles.success} />
                            <Text className={styles.txt}>恭喜您！绑定成功！</Text>
                        </View>
                    </View> : null}
            </View> : null}
        </View>
    )
}

export default BindEmail;