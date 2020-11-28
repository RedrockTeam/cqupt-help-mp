import React from "react";
import { View, Image } from "@tarojs/components";
import loading from '@/static/images/loading.gif';
import wifierr from '@/static/images/error.png';
import styles from './index.module.scss';
const LoadingPage = ({ isError }) => {
    return (
        <View className={styles.bfc}>
            {isError ?
                <Image className={styles.img} src={wifierr} />
                :
                <Image className={styles.img} src={loading} />
            }
        </View>
    )
}

export default LoadingPage