import React, { useState } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import { useQuery } from "react-query/dist/react-query.production.min";
import NewInput from '../../components/Newinput/index.jsx'
import reset from "@/static/images/reset.png";
import close from "@/static/images/close.png"
import open from "@/static/images/open.png"
import robSuccess from '@/static/images/rob-success.png'
import styles from "./index.module.scss";
import request from "@/common/helpers/request";
import LoadingPage from '../../components/Loding/index.jsx'
import { useUserInfo } from "@/stores/user";
import { useRouter } from "@tarojs/taro";
import { getQuesAndEmailState } from '../../services/index.ts'
import { resolvePage, navTo } from "@/common/helpers/utils";

const ResetPassword = () => {
    const { params } = useRouter();
    const { token } = useUserInfo();
    const { stuNum } = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[0]))));
    const [isSuccess, setisSuccess] = useState(false);
    const { data, isLoading, isError } = useQuery(
        [stuNum],
        getQuesAndEmailState
    );
    const [newinput, setnewinput] = useState(null);
    const [renewinput, setrenewinput] = useState(null);
    const [promptMessage, setpromptMessage] = useState(null);
    const getInputValue = (e) => setnewinput(e.detail.value);
    const getReInputValue = (e) => setrenewinput(e.detail.value);
    const handleConfirm = async () => {
        if (newinput != renewinput)
            setpromptMessage("两次密码不一致，请重新输入")
        else {
            const res = await request("https://run.mocky.io/v3/c0327d69-b08a-43d5-a084-549651041b4f", {
                method: "POST",
                data: { stu_num: stuNum, new_password: newinput, code: params.code }
            })
            if (res.status == 10000) {
                setisSuccess(true);
                setTimeout(() => {
                    setisSuccess(null)
                    navTo({ url: resolvePage("index", "bind") });
                }, 1500)
            }
        }

    }
    return (
        <View>
            {!isLoading ? <View>
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
                    <Button className={newinput && renewinput ? styles.confirmActive : styles.confirm} onClick={handleConfirm}>确定</Button>
                </View>
                {isSuccess ? <View>
                    <View className={styles.cover} />
                    <View className={styles.popup}>
                        <Image src={robSuccess} className={styles.success} />
                        <Text className={styles.txt}>重设密码成功！</Text>
                    </View>
                </View> : null}
            </View> : <LoadingPage isError={isError} />}
        </View>
    )
}

export default ResetPassword;