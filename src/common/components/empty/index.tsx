/* eslint-disable react/require-default-props */
import React from "react";
import { View, Image, Text, ITouchEvent } from "@tarojs/components";
import emptyImg from "@/static/images/empty.png";
import styles from "./index.module.scss";
import NavBack from "../nav-back";
import PrimaryButton from "../primary-button";

type Props = {
  title?: string;
  detail: string;
  suggestion?: string;
  onBtnClick?: (event: ITouchEvent) => unknown;
  btnContent?: string;
};

const Empty = ({
  title,
  detail,
  suggestion,
  onBtnClick,
  btnContent,
}: Props) => {
  if (title)
    return (
      <View className={styles.emptyPageWrapper}>
        <NavBack title={title} background="#FFFFFF" />
        <Image src={emptyImg} mode="aspectFit" className={styles.pageImg} />
        <Text className={styles.text}>{detail}</Text>
        <Text className={styles.text}>{suggestion}</Text>
        <PrimaryButton className={styles.btn} onClick={onBtnClick}>
          {btnContent}
        </PrimaryButton>
      </View>
    );
  return (
    <View className={styles.emptyWrapper}>
      <Image src={emptyImg} mode="aspectFit" className={styles.img} />
      <Text className={styles.text}>{detail}</Text>
    </View>
  );
};

export default Empty;
