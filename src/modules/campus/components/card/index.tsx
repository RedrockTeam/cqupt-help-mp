import React from "react";
import { navigateTo } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import enterIcon from "@/static/images/campus-enter-icon.png";
import styles from "./index.module.scss";

type Props = {
  img: string;
  title: string;
  organization: string;
  link: string;
};

const Card = ({ img, title, organization, link }: Props) => {
  const handleClickCard = () => navigateTo({ url: link });
  return (
    <View className={styles.wrapper} onClick={handleClickCard}>
      <Image src={img} className={styles.img} />
      <View className={styles.info}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.organization}>{organization}</Text>
      </View>
      <Image src={enterIcon} className={styles.icon} />
    </View>
  );
};

export default Card;
