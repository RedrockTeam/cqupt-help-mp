import { View } from "@tarojs/components";
import React from "react";
import styles from "./index.module.scss";

export interface SwitchHeaderProps {
  active: number;
  setActive: (n: number) => void;
  titles: string[];
}

const SwitchHeader = ({ active, setActive, titles }: SwitchHeaderProps) => {
  return (
    <View className={styles.header}>
      {titles.map((title, index) => (
        <View
          key={index}
          className={`${styles.title} ${active === index && styles.active}`}
          onClick={() => setActive(index)}
        >
          {title}
        </View>
      ))}
    </View>
  );
};

export default SwitchHeader;
