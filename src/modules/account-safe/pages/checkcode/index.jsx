import React, { useRef, useState, useEffect } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import { useMutation } from "react-query/dist/react-query.production.min";
import request from "@/common/helpers/request";
import reset from "@/static/images/reset.png";
import CheckInput from '../../components/Checkinput/index.jsx';
import styles from "./index.module.scss";
import robSuccess from '@/static/images/rob-success.png'
import { checkEmail, checkEmailCode, getEmail } from '../../services/index.ts';
import { resolvePage, navTo } from "@/common/helpers/utils";
import { useRouter } from "@tarojs/taro";
const BindEmail = () => {
    const { params: { stuNum } } = useRouter();
    const [countdown, setcountdown] = useState(60);
    const [emailFormat, setemailFormat] = useState(null);
    const [showMessage, setshowMessage] = useState(false);
    const [showBind, setshowBind] = useState(false);
    const [emailAddress, setemailAddress] = useState(0);
    const [VerificationCode, setverificationCode] = useState(null);
    const [Index, setIndex] = useState(0);
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
        } else {
            //当ti=0时执行终止循环方法
            clearInterval(timeChange);
        }
    };
    const sendCode = () => {
        //每隔一秒执行一次clock方法
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
    const handleSecend = () => {
        timerRef.current = setInterval(() => {
            setCount(count - 1);
        }, 1000)
    }
    const isCodeRight = (e) => {
        setuserCode(e.detail.value)
    }
    //暂时写在这里
    const [mutateGet] = useMutation(getEmail)
    const [mutateCheck] = useMutation(checkEmail)
    const handleMessage = async () => {
        let isEmailTrue;
        const res = await mutateGet(stuNum, {
            onSuccess: (res) => {
                if (res.status === 10000) {
                    let bindEmail = res.data.email;
                    if (bindEmail == emailAddress) {
                        console.log("相等")
                        isEmailTrue = Promise.resolve(true);
                    } else {
                        setMessageInfor('邮箱信息错误')
                        setshowMessage(true);
                        setTimeout(() => {
                            setshowMessage(false)
                        }, 2000);
                    }
                }
            }
        })
        await isEmailTrue;
        console.log("true有值")
        if (isEmailTrue) {
            console.log("执行")
            const check = await mutateCheck(stuNum, {
                onSuccess: (check) => {
                    if (check.status === 10000) {
                        setMessageInfor('已向您的邮箱发送一条验证码')
                        setshowMessage(true);
                        setTimeout(() => {
                            setshowMessage(false)
                            setIndex(1);
                            sendCode();
                        }, 2000);
                    }
                }
            })
        }
    }
    const handleResent = async () => {
        if (countdown == 0 && PropmtMessage.includes("重新发送")) {
            const res = await mutateCheck({ account: stuNum, email: emailAddress }, {
                onSuccess: (res) => {
                    if (res.status == 10000) {
                        setcountdown(60);
                        ti = 60;
                        sendCode();
                    } else if (res.status == 10009) {
                        setPropmtMessage("发送次数受限")
                    }
                }
            })
        }
    }
    const [mutateSend] = useMutation(checkEmailCode)
    const sendEmailAndCode = async () => {
        const res = await mutateSend({ email: emailAddress, code: userCode, account: stuNum }, {
            onSuccess: (res) => {
                if (res.status === 10000) {
                    setshowBind(true);
                    setTimeout(() => {
                        setshowBind(false);
                        console.log(res.data)
                        navTo({ url: resolvePage("account-safe", "resetpassword"), payload: { code: res.data.code, stuNum } });
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

    return (
        <View>
            {Index == 0 ?
                <View>
                    <CheckInput message="请输入你绑定的邮箱:" title="验证邮箱" onInput={handleFormat} onConfirm={handleMessage} disabled={!emailFormat} condition={emailFormat} placeholder="请输入邮箱地址">
                        <Text className={styles.prompt} >{(emailFormat || emailFormat == null) ? null : "请输入正确的邮件地址"}</Text>
                    </CheckInput>
                    {showMessage ? <Text className={styles.message}>{MessageInfor}</Text> : null}
                </View> : null
            }
            {
                Index == 1 ? <View className={styles.list}>
                    <View className={styles.title}>
                        <Text>请输入邮箱验证码</Text>
                    </View>
                    <View className={styles.input}>
                        <Input className={styles.inputcontent} placeholder="请输入验证码" onInput={isCodeRight} />
                        <Text className={styles.resend} onClick={handleResent}>{countdown != 0 ? `已发送${countdown}` : PropmtMessage}</Text>
                    </View>
                    <Text className={styles.prompt}>{(VerificationCode || VerificationCode == null) ? null : "验证码错误"}</Text>
                    <Text className={styles.contect} onClick={() => navTo({ url: resolvePage("feedback", "index") })}>绑定失败？联系我们</Text>
                    <Button className={userCode ? styles.nextActive : styles.next} onClick={sendEmailAndCode}> 下一步</Button>
                    {showBind ?
                        <View>
                            <View className={styles.cover} />
                            <View className={styles.popup}>
                                <Image src={robSuccess} className={styles.success} />
                                <Text className={styles.txt}>验证成功</Text>
                            </View>
                        </View> : null}
                </View> : null
            }
        </View >
    )
}

export default BindEmail;