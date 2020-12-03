import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import CheckInput from '../../components/Checkinput/index.jsx';
import LoadingPage from '../../components/Loding/index.jsx'
import { useQuery, useMutation } from "react-query/dist/react-query.production.min";
import { getProtectQuestion, checkAnswer } from '../../services/index.ts';
import { resolvePage, navTo } from "@/common/helpers/utils";
import styles from './index.module.scss';
import { getStorage, getStorageSync, removeStorage, setStorage, useRouter } from "@tarojs/taro";

const CheckProtect = () => {
    const { params: { stuNum } } = useRouter();
    const [protectQues, setprotectQues] = useState(null);
    const [quesId, setquesId] = useState(null);
    const [answerRight, setanswerRight] = useState(null);
    //倒计时部分TODO:应该有更好的方法
    const [countdown, setcountdown] = useState(60);
    const [banTime, setbanTime] = useState(0)
    const [banMessage, setbanMessage] = useState("剩余次数")
    let timeChange, banIndex = 0, ti = countdown;
    try {
        if (!getStorageSync("BanIndex").data)
            setStorage({
                key: "BanIndex",
                data: banIndex
            })
    } catch (e) {
        console.log(e)
    }
    let banArray = [60, 300, 600, 1200];
    const clock = async () => {
        if (ti > 0) {
            //当ti>0时执行更新方法
            ti = ti - 1;
            setcountdown(ti);
        } else {
            //当ti=0时执行终止循环方法
            clearInterval(timeChange);
            setbanTime(4);
            setbanMessage("剩余次数")
            let { data: index } = await getStorage({ key: "BanIndex" })
            setStorage({ key: "BanIndex", data: index + 1 });
        }
    };
    const sendCode = () => {
        //每隔一秒执行一次clock方法
        timeChange = setInterval(clock, 1000);
    };
    const [mutateAnswer, { isLoading, isError }] = useMutation(getProtectQuestion, {
        onSuccess: (res) => {
            console.log(res)
            if (res.status === 10000) {
                console.log("执行")
                const { data } = res;
                setprotectQues(data[0].content);
                setquesId(data[0].id);
            }
        },
    })
    const [mutateCheck] = useMutation(checkAnswer, {
        onSuccess: async (res) => {
            if (res.status == 10000) {
                navTo({ url: resolvePage("account-safe", "resetpassword"), payload: { code: res.data.code, stuNum } });
            } else if (res.status == 10005) {
                setanswerRight(false)
                setbanTime(banTime + 1);
                let { data: index } = await getStorage({ key: "BanIndex" });
                console.log(index)
                if (banTime === 4 || index !== 0) {
                    ti = banArray[index];
                    setcountdown(banArray[index])
                    sendCode();
                    setbanMessage("输入框禁用")
                }
            }
        },
    })
    useEffect(() => {
        const res = (async function () {
            await mutateAnswer(stuNum);
        })();
        console.log(res, isLoading, isError)
    }, [])//括号不能省略
    const [protectAnswer, setprotectAnswer] = useState(null);
    const handleProtect = (e) => {
        if (e.detail.value.length == 0) setanswerRight(null)
        setprotectAnswer(e.detail.value)
    };
    const checkProtect = async () => {
        const res = await mutateCheck({ stu_num: stuNum, question_id: quesId, content: protectAnswer })
    }
    return (
        <View>
            {!isLoading ? <View>
                <View>
                    <CheckInput message={protectQues} title="验证密保" onInput={handleProtect} inputDisable={banMessage.includes("输入框禁用")} disabled={banMessage.includes("输入框禁用")} onConfirm={checkProtect} condition={true} placeholder="请输入密保答案">
                        <Text className={styles.prompt} >{(answerRight || answerRight == null) ? null : "密保验证错误"}</Text>
                        <Text className={styles.ban} >{banMessage.includes("输入框禁用") ? `${banMessage}${countdown}` : `${banMessage}${5 - banTime}`}</Text>
                    </CheckInput>

                </View>
            </View> : <LoadingPage isError={isError} />}
        </View>
    )
}


export default CheckProtect;