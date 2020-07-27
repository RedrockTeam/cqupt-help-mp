import React, { useState } from "react";
import {
  View,
  Input,
  BaseEventOrigFunction,
  Image,
  Text,
} from "@tarojs/components";
import { InputProps } from "@tarojs/components/types/Input";
import PrimaryButton from "@/common/components/primary-button";
import passwordIcon from "@/static/images/password-icon.png";
import passwordTitleIcon from "@/static/images/password-title-icon.png";
import accountIcon from "@/static/images/account-icon.png";
import styles from "./index.module.scss";

const Bind = () => {
  const [account, setAccount] = useState("");
  const handleAccountInput: BaseEventOrigFunction<InputProps.inputEventDetail> = (
    e
  ) => setAccount(e.detail.value);

  const [password, setPassword] = useState("");
  const handlePasswordInput: BaseEventOrigFunction<InputProps.inputEventDetail> = (
    e
  ) => setPassword(e.detail.value);

  const handleBind = () => {
    // TODO: request
  };

  return (
    <View className={styles.wrapper}>
      <View className={styles.title}>登录</View>
      <View className={styles.form}>
        <View className={styles.formItem}>
          <View className={styles.formTitle}>
            <Image src={accountIcon} className={styles.titleIcon} />
            账号
          </View>
          <View className={styles.itemWrapper}>
            <Input
              className={styles.input}
              type="text"
              value={account}
              onInput={handleAccountInput}
            />
          </View>
        </View>
        <View className={styles.formItem}>
          <View className={styles.formTitle}>
            <Image src={passwordTitleIcon} className={styles.titleIcon} />
            密码
          </View>
          <View className={styles.itemWrapper}>
            <Input
              className={styles.input}
              placeholderClass={styles.placeholder}
              password
              value={password}
              onInput={handlePasswordInput}
              placeholder="身份证后六位"
            />
            <Image src={passwordIcon} className={styles.icon} />
          </View>
        </View>
        <PrimaryButton className={styles.btn} onClick={handleBind}>
          登录
        </PrimaryButton>
      </View>
      <Text className={styles.copyright}>COPYRICHT@红岩网校工作站</Text>
    </View>
  );
};

export default Bind;
