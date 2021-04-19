import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import scan from "@/static/images/scan.png";
import eatOn from "@/static/images/eat-on.png";
import eat from "@/static/images/eat.png";
import drinkOn from "@/static/images/drink-on.png";
import drink from "@/static/images/drink.png";
import Popup from "../../components/popup";

import styles from "./index.module.scss";

const SafeRun = () => {
  const [isEat, setEat] = useState(false);
  const [isDrink, setDrink] = useState(true);

  const [isPop, setIsPop] = useState(false);

  const clickEat = () => {
    setEat(true);
    setDrink(false);
  };

  const clickDrink = () => {
    setEat(false);
    setDrink(true);
  };

  const cb: Taro.onAccelerometerChange.Callback = (res) => {
    // console.log(res.x, res.y, res.y);
    if (res.x > 0.5) {
      console.log("摇一摇");
      setIsPop(true);
    }
  };

  useEffect(() => {
    Taro.onAccelerometerChange(cb);
    return () => Taro.offAccelerometerChange(cb);
  }, []);

  return (
    <View className={styles.wrap}>
      <View className={styles.scanWrap}>
        <Image src={scan} className={styles.scan} />
      </View>
      <View className={styles.footer}>
        <View
          className={styles.iconWrap}
          onClick={() => {
            clickEat();
          }}
        >
          <Image className={styles.icon} src={`${isEat ? eatOn : eat}`} />
          <Text className={styles.text}>吃什么</Text>
        </View>
        <View
          className={styles.iconWrap}
          onClick={() => {
            clickDrink();
          }}
        >
          <Image className={styles.icon} src={`${isDrink ? drinkOn : drink}`} />
          <Text className={styles.text}>喝什么</Text>
        </View>
      </View>
      <Popup
        img={eat}
        title="古茗奶茶店"
        detail="每晚十点相约"
        isShow={isPop}
      />
    </View>
  );
};

export default SafeRun;
