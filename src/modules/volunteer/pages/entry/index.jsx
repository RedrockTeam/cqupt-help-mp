import React, { useState } from "react";
import { View, Text, Button, Input } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import styles from "./index.module.scss";

const VolunteerEntry = () => {
  const [phone, setPhone] = useState();
  const [IdCardNum, setIdCardNum] = useState();
  const [volunteerNum, setVolunteerNUm] = useState();

  const changePhone = (e) => {
    setPhone(e.detail.value);
  };

  const changeIdCardNum = (e) => {
    setIdCardNum(e.detail.value);
  };

  const changeVolunteerNum = (e) => {
    setVolunteerNUm(e.detail.value);
  };

  return (
    <View className={styles.wrapper}>
      <NavBack title="志愿报名" background="#F6F6F9" />
      <View className={styles.title}>
        <View>欢迎使用</View>
        <View>志愿报名系统</View>
      </View>
      <View className={styles.form}>
        <View className={styles.formLabel}>电话号码:</View>
        <Input
          className={styles.formInput}
          value={phone}
          onInput={(e) => {
            changePhone(e);
          }}
        />
        <View className={styles.formLabel}>身份证号:</View>
        <Input
          className={styles.formInput}
          value={IdCardNum}
          onInput={(e) => {
            changeIdCardNum(e);
          }}
        />
        <View className={styles.formLabel}>志愿者账号:</View>
        <Input
          className={styles.formInput}
          value={volunteerNum}
          onInput={(e) => {
            changeVolunteerNum(e);
          }}
        />
      </View>
      <View className={styles.tips}>
        注意：请仔细输入信息，该信息将影响
        <Text style={{ color: "rgba(254,145,125)" }}>志愿时长</Text>
        的统计！
      </View>
      <Button
        className={
          phone && IdCardNum && volunteerNum ? styles.buttonPush : styles.button
        }
      >
        登录
      </Button>
    </View>
  );
};

export default VolunteerEntry;
