import React, { useRef, useState } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import { useMutation, useQuery } from "react-query/dist/react-query.production.min";
import NewInput from '../../components/Newinput/index.jsx'
import reset from "@/static/images/reset.png";
import close from "@/static/images/close.png"
import open from "@/static/images/open.png"
import robSuccess from '@/static/images/rob-success.png'
import styles from "./index.module.scss";
import request from "@/common/helpers/request";
import LoadingPage from '../../components/Loding/index.jsx'
import { getInfo } from "@/stores/user";
import { getQuesAndEmailState, changPassword, judgePassword } from '../../services/index.ts'
import { resolvePage, navTo } from "@/common/helpers/utils";
import { redirectTo, switchTab } from "@tarojs/taro";

const ResetPassword = () => {
    const { stuNum } = getInfo();
    const [showPop, setshowPop] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const myinput = useRef(null);
    const { data, isLoading, isError } = useQuery(
        [stuNum],
        getQuesAndEmailState
    );
    const [originPassword, setoriginPassword] = useState(null)
    const [newinput, setnewinput] = useState(null);
    const [renewinput, setrenewinput] = useState(null);
    const [promptMessage, setpromptMessage] = useState(null);
    const [Index, setIndex] = useState(0);
    const [mutateJudge] = useMutation(judgePassword)
    const handleNext = async () => {
        if (originPassword.length >= 6) {
            const res = await mutateJudge(originPassword, {
                onSuccess: (res) => {
                    if (res.status === 10002) {
                        setTimeout(() => {
                            setshowPop(true)
                        }, 400)
                    } else if (res.status === 10000) {
                        setIndex(1)
                    }
                }
            })
        }
    }
    const reinput = () => {
        setshowPop(false);
        myinput.current.value = null;
    }
    const getInputValue = (e) => setnewinput(e.detail.value);
    const getReInputValue = (e) => {
        if (e.detail.value.length == 0) setpromptMessage(null)
        setrenewinput(e.detail.value)
    };
    const [mutateChange] = useMutation(changPassword)
    const handleConfirm = async () => {
        if (newinput != renewinput)
            setpromptMessage("两次密码不一致，请重新输入")
        else {
            const res = await mutateChange({ Origin: originPassword, New: newinput }, {
                onSuccess: (res) => {
                    if (res.status === 10000) {
                        setisSuccess(true);
                        setTimeout(() => {
                            setisSuccess(null)
                            switchTab({ url: resolvePage("my", "index") });
                        }, 1500)
                    } else if (res.status === 10002) {
                        setIndex(0)
                        setIndex(Index.slice())
                        setTimeout(() => {
                            setshowPop(true)
                        }, 400)
                    } else if (res.status === 10020) {
                        setpromptMessage("新旧密码重复");
                    }
                }
            })
        }
    }
    return (
        <View>
            {!isLoading ? <View>
                {Index == 0 ? (
                    <View>
                        <View className={styles.list}>
                            <View className={styles.title}>
                                <Image src={reset} className={styles.reset} />
                                <Text>原密码</Text>
                            </View>
                            <View className={styles.input}>
                                <Input ref={myinput} onInput={(e) => setoriginPassword(e.detail.value)} type="password" className={styles.inputcontent} placeholder="请输入原密码" />
                            </View>
                            <Text className={styles.forget} onClick={() => navTo({ url: resolvePage("account-safe", "forget") })}>
                                忘记密码？
                            </Text>
                            <Button className={originPassword?.length >= 6 ? styles.nextActive : styles.next} onClick={handleNext}> 下一步</Button>
                        </View>
                        <View>
                            <View className={styles.cover} style={showPop ? null : "display:none"} />
                            <View className={showPop ? styles.popWindowActive : styles.popWindow}>
                                <View className={styles.title}>原密码错误，请重新输入</View>
                                <View className={styles.reinput} onClick={() => reinput()}>重新输入</View>
                                <View className={styles.forgetpass} onClick={() => redirectTo({ url: resolvePage("account-safe", "forget") })}>忘记密码</View>
                            </View>
                        </View>
                    </View>
                ) : null}
                {Index == 1 ? (
                    <View>
                        <View>
                            <View className={styles.newpass}>
                                <NewInput moren="请输入6位以上新密码" src={open} type="text" onChange={getInputValue} />
                                <Text className={styles.prompt}>{newinput?.length < 6 ? "请至少输入6个字符" : null}</Text>
                            </View>
                            <View className={styles.renewpass}>
                                <NewInput moren="请再次输入6位以上新密码" src={close} type="password" onChange={getReInputValue} />
                                <Text className={styles.prompt}>{promptMessage}</Text>
                            </View>
                        </View>
                        <View>
                            <Button disabled={!(newinput?.length >= 6 && renewinput?.length >= 6)} className={newinput?.length >= 6 && renewinput?.length >= 6 ? styles.confirmActive : styles.confirm} onClick={handleConfirm}>确定</Button>
                        </View>
                        {isSuccess ? <View>
                            <View className={styles.cover} />
                            <View className={styles.popup}>
                                <Image src={robSuccess} className={styles.success} />
                                <Text className={styles.txt}>密码修改成功！</Text>
                            </View>
                        </View> : null}
                    </View>
                ) : null}
            </View> : <LoadingPage isError={isError} />}
        </View>
    )
}

export default ResetPassword;
