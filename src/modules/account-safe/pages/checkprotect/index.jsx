import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import CheckInput from '../../components/Checkinput/index.jsx';
import LoadingPage from '../../components/Loding/index.jsx'
import { useQuery, useMutation } from "react-query/dist/react-query.production.min";
import { getProtectQuestion, checkAnswer } from '../../services/index.ts';
import { useUserInfo } from "@/stores/user";
import { resolvePage, navTo } from "@/common/helpers/utils";
import styles from './index.module.scss';
const CheckProtect = () => {
    const { token } = useUserInfo();
    const { stuNum } = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[0]))));
    const [protectQues, setprotectQues] = useState(null);
    const [quesId, setquesId] = useState(null);
    const [answerRight, setanswerRight] = useState(null);
    const [mutateAnswer, { isLoading, isError }] = useMutation(getProtectQuestion, {
        onSuccess: (res) => {
            console.log(res)
            if (res.status === 10000) {
                const { data } = res;
                setprotectQues(data[0].question);
                setquesId(data[0].id);
            } else {
                console.log('meishoudao')
            }
        },
    })
    const [mutateCheck] = useMutation(checkAnswer, {
        onSuccess: (res) => {
            if (res.status == 10000) {
                navTo({ url: resolvePage("account-safe", "resetpassword"), payload: { code: res.data.code } });
            } else if (res.status == 10005) {
                setanswerRight(false)
            } else {

            }
        },
    })
    useEffect(async () => {
        const res = await mutateAnswer(stuNum);
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
                    <CheckInput message={protectQues} title="验证密保" onInput={handleProtect} onConfirm={checkProtect} condition={true} placeholder="请输入密保答案">
                        <Text className={styles.prompt} >{(answerRight || answerRight == null) ? null : "密保验证错误"}</Text>
                    </CheckInput>
                </View>
            </View> : <LoadingPage isError={isError} />}
        </View>
    )
}


export default CheckProtect;