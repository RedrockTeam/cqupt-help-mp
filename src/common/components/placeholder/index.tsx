import React from "react";
import { View, Image } from "@tarojs/components";
import loadingImg from "@/static/images/loading.gif";
import errorImg from "@/static/images/error.png";
import NavBack from "@/common/components/nav-back";
import styles from "./index.module.scss";

type Props = {
  title?: string;
  isError?: boolean; // 可以换成 error 实例，根据具体 error 判断显示内容
};

const Placeholder = ({ title, isError = false }: Props) => {
  const img = isError ? errorImg : loadingImg;

  if (!title)
    return <Image mode="aspectFit" src={img} className={styles.img} />;
  return (
    <View className={styles.wrapper}>
      <NavBack title={title} background="#FFFFFF" />
      <Image mode="aspectFit" src={img} className={styles.img} />
    </View>
  );
};

export default Placeholder;
