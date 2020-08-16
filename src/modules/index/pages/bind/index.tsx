import React, { useState } from "react";
import {
  View,
  Input,
  BaseEventOrigFunction,
  Image,
  Text,
} from "@tarojs/components";
import { InputProps } from "@tarojs/components/types/Input";
import { useContainer } from "unstated-next";
import PrimaryButton from "@/common/components/primary-button";
import passwordTitleIcon from "@/static/images/password-title-icon.png";
import error from "@/static/images/error.png";
import accountIcon from "@/static/images/account-icon.png";
import { useMutation } from "react-query";
import { switchTab } from "@tarojs/taro";
import { resolvePage } from "@/common/helpers/utils";
import PopupContext from "@/stores/popup";
import { getUserInfo } from "@/stores/user";
import styles from "./index.module.scss";
import { bindReq } from "../../services";

const Bind = () => {
  const [account, setAccount] = useState("");
  const handleAccountInput: BaseEventOrigFunction<InputProps.inputEventDetail> = (
    e
  ) => setAccount(e.detail.value);

  const [password, setPassword] = useState("");
  const handlePasswordInput: BaseEventOrigFunction<InputProps.inputEventDetail> = (
    e
  ) => setPassword(e.detail.value);

  const Popup = useContainer(PopupContext);

  const [mutateBind, { isLoading }] = useMutation(bindReq);

  const handleBind = async () => {
    try {
      const data = await mutateBind({ account, password });
      if (data.errcode === "10010") {
        const hide = Popup.show({
          title: "登录失败",
          detail: "已绑定，不能重复绑定",
        });
        setTimeout(() => hide(), 1500);
      } else if (data.status === "10000") {
        await getUserInfo(data.data.token);
        switchTab({ url: resolvePage("index", "home") });
      }
      // requestSubscribeMessage({ // 长期订阅的逻辑，但是现在不能申请到长期订阅，等 wx 开放
      //   tmplIds: [
      //     "fM1Jx8XieAXy4VGNHCptnVTlwLjcT-tr0adXY9w9rU8",
      //     "RzdGZvkrZCXjIepcPzjfLYugkckhKLxVW9WClFJhZ3Q",
      //   ],
      //   complete() {
      // showModal({
      //   title: "提示",
      //   content: "之后可以点击右上角进入设置进行修改",
      //   showCancel: false,
      //   success() {
      //     switchTab({ url: resolvePage("index", "home") });
      //   },
      // });
      // },
      // });
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
    <View className={styles.wrapper}>
      <View className={styles.title}>欢迎登录</View>
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
              maxlength={10}
              value={account}
              onInput={handleAccountInput}
              placeholder="学号"
              placeholderClass={styles.placeholder}
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
              maxlength={6}
              value={password}
              onInput={handlePasswordInput}
              placeholder="身份证后六位"
            />
          </View>
        </View>
        <PrimaryButton className={styles.btn} onClick={handleBind}>
          {isLoading ? "Loading..." : "登录"}
        </PrimaryButton>
      </View>
      <Text className={styles.copyright}>COPYRICHT@红岩网校工作站</Text>
      <Popup.Comp />
    </View>
  );
};

export default Bind;
