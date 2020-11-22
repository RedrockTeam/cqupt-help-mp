import React from "react";
import { View, Text, Image } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import styles from "./index.module.scss";
import Taro, { useRouter } from "@tarojs/taro";
import { useUserInfo } from "@/stores/user";
import copyPng from "@/static/images/volunteer-copy.png";
import { useQuery } from "react-query/dist/react-query.production.min";
import { postVolunteerActivityRead } from "../../services";




const PAGE_TITLE = '报名结果'

const VolunteerApply = () => {
    const { params } = useRouter();
    const { name, pass, concat, date, registration_time } = params
    const { realName } = useUserInfo();

    useQuery(
        ["postVolunteerActivityRead", registration_time],
        postVolunteerActivityRead
    );

    const copy = () => {
        Taro.setClipboardData({
            data: concat,
        });
    };


    let desc;

    switch (pass) {
        case '1':
            desc = `恭喜您通过了${name}志愿活动，${date}的志愿报名，请你尽快加入到我们的志愿活动qq群，了解本次志愿活动的详细信息，群号为${concat}`;
            break;

        default:
            desc = '很遗憾，您未成功抢到本次志愿活动的机会，不过也请不要气馁，时常查看”青协志愿者协会”或志愿者服务群，能快速获取志愿活动报名的时间，相信您下次一定能够成功参与志愿活动！'
            break;
    }



    return (
        <View className={styles.wrapper}>
            <NavBack title={PAGE_TITLE} background="#F6F6F9" />
            <View className={styles.container}>
                <View className={styles.content}>
                    <Text className={styles.appellation}>亲爱的{realName}同学:</Text>
                    <View className={styles.desc}>
                        {desc}
                        {
                            pass === '1' ? (
                                <Image
                                    src={copyPng}
                                    className={styles.copyPng}
                                    onClick={() => {
                                        copy();
                                    }}
                                />
                            ) : null
                        }
                    </View>

                </View>
            </View>
        </View>
    )
}

export default VolunteerApply
