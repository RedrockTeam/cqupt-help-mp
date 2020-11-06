import React from 'react'
import { View, Text } from '@tarojs/components'
import NavBack from '@/common/components/nav-back';
import { useQuery } from 'react-query/dist/react-query.production.min';
import Placeholder from "@/common/components/placeholder";


import styles from "./index.module.scss";
import { useRouter } from '@tarojs/taro';
import { getVolunteerActivityApllication } from '../../services';
import { VolunteerActivityApplication } from '../../services/dto';
import { useUserInfo } from '@/stores/user';



const PAGE_TITLE = '报名结果'

const VolunteerApply = () => {
    const { params } = useRouter();
    const userInfo = useUserInfo();

    const { data: applicationRes, isLoading, isError } = useQuery(
        ['getVolunteerActivityApllication', params.id],
        getVolunteerActivityApllication
    );

    const desc = '恭喜您通过了xx志愿活动，9月25日 13:00-18:00的志愿报名，请你尽快加入到我们的志愿活动qq群，了解本次志愿活动的详细信息，群号为xxxx'

    if (isLoading) return <Placeholder title={PAGE_TITLE} />;
    if (isError || !applicationRes)
        return <Placeholder title={PAGE_TITLE} isError />;

    const application: VolunteerActivityApplication = applicationRes.data

    return (
        <View className={styles.wrapper}>
            <NavBack title={PAGE_TITLE} background="#F6F6F9"/>
            <View className={styles.container}>
                <View className={styles.content}>
                    <Text className={styles.appellation}>亲爱的{userInfo.realName}同学:</Text>
                    <Text className={styles.desc}>{desc}</Text>
                </View>
            </View>
        </View>
    )
}

export default VolunteerApply