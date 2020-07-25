import React from 'react'
import { View, Text, Button,Input} from '@tarojs/components'
import  styles from './index.module.scss'

const VolunteerEntry = () => {
    return (
      <View className={styles.wrapper}>
        <View className={styles.title}>
          <View>欢迎使用</View>
          <View>志愿报名系统</View>
        </View>
        <View className={styles.form}>
          <View className={styles.formLabel}>电话号码</View>
          <Input className={styles.formInput}></Input>
          <View className={styles.formLabel}>身份证号</View>
          <Input className={styles.formInput}></Input>
          <View className={styles.formLabel}>志愿者账号</View>
          <Input className={styles.formInput}></Input>
        </View>
        <View className={styles.tips}>
          注意：请仔细输入信息，该信息将影响
          <Text style={{ color: "rgba(254,145,125)" }}>志愿时长</Text>的统计！
        </View>
        <Button className={styles.button}>登录</Button>
      </View>
    );
}

export default VolunteerEntry
