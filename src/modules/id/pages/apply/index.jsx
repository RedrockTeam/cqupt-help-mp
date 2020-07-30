import React, { useState } from "react";
import { View, Image, Input } from "@tarojs/components";
import PrimaryButton from "@/common/components/primary-button";
import Popup from "@/common/components/popup";
import icon from "@/static/images/account-icon.png";
import apply from "@/static/images/apply.png";
import styles from "./index.module.scss";

const Apply = () => {
  const handleClick = () => {
    setIsShow(true);
  };

  const [isShow, setIsShow] = useState(false);

  return (
    <View className={styles.wrap}>
      <View className={styles.top}>
        <View className={styles.title}>申请新会员</View>
        <View className={styles.tips}>要保证社团名称信息的准确性哦</View>
      </View>
      <View>
        <View className={styles.mid}>
          <View className={styles.iconWrap}>
            <Image src={icon} className={styles.icon} />
            <View>社团名称</View>
          </View>
          <Input className={styles.input} placeholder="请输入社团全称" />
        </View>
      </View>
      <PrimaryButton className={styles.button} onClick={handleClick}>
        完成
      </PrimaryButton>
      <Popup
        img={apply}
        isShow={isShow}
        detail="信息已上传，请耐心等待审核结果"
      />
    </View>
  );
};

export default Apply;
