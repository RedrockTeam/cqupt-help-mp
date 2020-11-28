import React from "react";
import { View, Image, Text, Input } from "@tarojs/components";
import reset from "@/static/images/reset.png";
import styles from "./index.module.scss";

const NewInput = (props) => {
    return (
        <View className={styles.newList}>
            <View className={styles.title}>
                <Image src={reset} className={styles.reset} />
                <Text>新密码</Text>
            </View>
            <View className={styles.input}>
                <Input type={props.type} className={styles.inputcontent} placeholder={props.moren} maxlength="16" onInput={props.onChange} />
                <Image src={props.src} className={styles.icon} />
            </View>
        </View>
    )
}
export default NewInput