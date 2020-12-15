import React, { useState } from "react";
import { View, Image, Text, Input, Button } from "@tarojs/components";
import { resolvePage, navTo } from "@/common/helpers/utils";
import reset from "@/static/images/reset.png";
import styles from "./index.module.scss";

const CheckInput = (props) => {
    const [answer, setAnswer] = useState(null)
    return (
        <View className={styles.list}>
            <View className={styles.title}>
                <Image src={reset} className={styles.reset} />
                <Text>{props.title}</Text>
            </View>
            <Text className={styles.message}>{props.message}</Text>
            <View className={styles.input}>
                <Input disabled={props.inputDisable} onInput={(e) => { props.onInput(e); setAnswer(e.detail.value) }} type="text" className={styles.inputcontent} placeholder={props.placeholder} />
                {props.children}
                <Text className={styles.contect} onClick={() => navTo({ url: resolvePage("feedback", "index") })}>验证失败？联系我们</Text>
            </View>
            <Button disabled={props.disabled} className={(props.condition && answer) ? styles.nextActive : styles.next} onClick={props.onConfirm}>确定</Button>
        </View>
    )
}
export default CheckInput;