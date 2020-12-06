import React, { useRef, useState, useEffect } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import request from "@/common/helpers/request";
import { useQuery, useMutation } from "react-query/dist/react-query.production.min";
import { getQuestionList, bindProtect } from "../../services/index.ts";
import LoadingPage from '../../components/Loding/index.jsx'
import robSuccess from '@/static/images/rob-success.png';
import reset from "@/static/images/reset.png";
import cancel from '@/static/images/cancel.png';
import styles from "./index.module.scss";
import { resolvePage, navTo } from "@/common/helpers/utils";
import { switchTab } from "@tarojs/taro";

const placeStyle = "font-family: PingFang SC;font-weight: normal;font-size: 32rpx;color: #A4A3B7;"

const SetPasswordProtect = () => {
    const { data, isLoading, isError } = useQuery(
        ["getQuestionList"],
        getQuestionList
    );
    const [answer, setanswer] = useState(null);
    console.log(answer)
    const [showPop, setshowPop] = useState(false);
    const [showBind, setshowBind] = useState(false);
    const [index, setindex] = useState(0);
    const [quesIndex, setquesIndex] = useState(0);
    const handleLength = (e) => {
        setanswer(e.detail)
    };
    useEffect(() => {
        if (!isLoading && index === 0) setquesIndex(data.data[0].id)
    }, [isLoading])
    const handleQuestion = (num, index) => { setquesIndex(num), setindex(index) }
    const [mutateBind] = useMutation(bindProtect)
    const setUserProtectQuestion = async () => {
        if (answer?.value?.length > 1) {
            console.log({ id: quesIndex, value: answer.value });
            const res = await mutateBind({ id: quesIndex, value: answer.value }, {
                onSuccess: (res) => {
                    if (res.status == 10000) {
                        setshowBind(true);
                        setTimeout(() => {
                            setshowBind(false);
                            switchTab({ url: resolvePage("my", "index") });
                        }, 1500)
                    }
                }
            })
        }
    }
    // service
    return (
        <View>
            {!isLoading ? <View>
                <View className={styles.main}>
                    <View className={styles.question}>
                        <Text className={styles.title}>选择问题</Text>
                        <Button className={styles.input} onClick={() => { setshowPop(true); }}>{data.data[index].content}</Button>
                    </View>
                    <View className={styles.setAnswer}>
                        <Text className={styles.title}>设置答案</Text>
                        <Input className={styles.input} type="text" maxlength="16" onInput={handleLength} placeholder="请设置密保答案" placeholderStyle={placeStyle}></Input>
                        <Text className={styles.prompt}>{answer?.cursor < 2 ? "答案由2-16位字符组成" : null}</Text>
                    </View>
                    <Button className={(answer?.cursor < 2 || !answer) ? styles.confirm : styles.confirmActive} onClick={setUserProtectQuestion}>确认</Button>
                </View>
                <View>
                    <View className={styles.cover} style={showPop ? null : "display:none"} />
                    <View className={showPop ? styles.popWindowActive : styles.popWindow}>
                        <View className={styles.title}>请选择密保设置问题</View>
                        <Image src={cancel} className={styles.cancel} onClick={() => { setshowPop(false); }} />
                        <View className={styles.quesList}>
                            {

                                data.data.map((item, index, arr) => {
                                    // 注意这里
                                    return <View hoverClass={styles.hover} hoverStayTime={2000} hoverStopPropagation={true} key={index} onClick={() => handleQuestion(item.id, index)}>{item.content}</View>
                                })
                            }
                        </View>
                    </View>
                </View>
                {showBind ?
                    <View>
                        <View className={styles.cover} />
                        <View className={styles.popup}>
                            <Image src={robSuccess} className={styles.success} />
                            <Text className={styles.txt}>恭喜您！绑定成功！</Text>
                        </View>
                    </View> : null}
            </View> : <LoadingPage isError={isError} />}
        </View >
    )
}
export default SetPasswordProtect;