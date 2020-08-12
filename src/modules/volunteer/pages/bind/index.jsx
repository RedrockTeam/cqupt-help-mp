import React, { useState } from "react";
import { redirectTo } from "@tarojs/taro";
import { View, Text, Button, Input } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import { useMutation } from "react-query/dist/react-query.production.min";
import { resolvePage } from "@/common/helpers/utils";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import error from "@/static/images/error.png";
import styles from "./index.module.scss";
import PopupBottom from "../../components/popup";
import { loginVolunteer } from "../../services";

const VolunteerBind = () => {
  const [mutateBindVolunteer] = useMutation(loginVolunteer);
  const Popup = useContainer(PopupContext);
  const [phone, setPhone] = useState();
  const [idCardNum, setIdCardNum] = useState();
  const [volunteerNum, setVolunteerNUm] = useState();
  const [showVerify, setShowVerify] = useState(false);

  const changePhone = (e) => {
    setPhone(e.detail.value);
  };

  const changeIdCardNum = (e) => {
    setIdCardNum(e.detail.value);
  };

  const changeVolunteerNum = (e) => {
    setVolunteerNUm(e.detail.value);
  };

  const handleShowVerify = () => {
    if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
      const hide = Popup.show({
        detail: "请输入正确的电话号码",
      });
      setTimeout(() => hide(), 1500);
    } else {
      setShowVerify(true);
    }
  };

  const cancelPopup = () => {
    setShowVerify(false);
  };

  const handleBindVolunteer = async () => {
    try {
      const data = await mutateBindVolunteer({
        phone,
        idCardNum,
        volunteerNum,
      });
      if (data.errcode === "10010") {
        const hide = Popup.show({
          title: "登录失败",
          detail: "已绑定，不能重复绑定",
        });
        setTimeout(() => hide(), 1500);
      } else {
        redirectTo({ url: resolvePage("volunteer", "index") });
        return null;
      }
    } catch (e) {
      const hide = Popup.show({
        title: "登录失败",
        detail: "网络错误",
        img: error,
      });
      setTimeout(() => hide(), 1500);
    }
  };

  return (
    <View>
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
            value={idCardNum}
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
            phone && idCardNum && volunteerNum
              ? styles.buttonPush
              : styles.button
          }
          disabled={!phone || !idCardNum || !volunteerNum}
          onClick={handleShowVerify}
        >
          登录
        </Button>
      </View>
      <Popup.Comp />
      <PopupBottom
        visible={showVerify}
        phone={phone}
        idCardNum={idCardNum}
        volunteerNum={volunteerNum}
        onCancel={cancelPopup}
        onOk={handleBindVolunteer}
      />
    </View>
  );
};

export default VolunteerBind;
