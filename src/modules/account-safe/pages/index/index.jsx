import React, { useState, useEffect, useCallback } from "react";
import { View, Image, Text, Button } from "@tarojs/components";
import {
  useQuery,
  useMutation,
} from "react-query/dist/react-query.production.min";
import { resolvePage, navTo } from "@/common/helpers/utils";
import request from "@/common/helpers/request";
import { redirectTo } from "@tarojs/taro";
import enter from "@/static/images/campus-enter-icon.png";
import { getInfo } from "@/stores/user";
import styles from "./index.module.scss";
import {
  getQuesAndEmailState,
  getPasswordState,
} from "../../services/index.ts";
import LoadingPage from "../../components/Loding/index.jsx";

const AccountSafe = (callback, deps) => {
  let stuNum;
  getInfo().then((e) => {
    console.log(1111111);
    console.log(e);
    stuNum = e.stuNum;
  });
  const [showPop, setshowPop] = useState(false);
  const [originLoading, setoriginLoading] = useState(true);
  const [PasswordText, setPasswordText] = useState(null);
  const { data, isLoading, isError } = useQuery(
    [stuNum],
    getQuesAndEmailState,
  );
  console.log(data, isLoading);
  const [mutateOrigin] = useMutation(getPasswordState, {
    onSuccess: (res) => {
      if (res.status === 10001) {
        setoriginLoading(false);
        setPasswordText("当前已修改密码");
      } else {
        setoriginLoading(false);
        setPasswordText("现为初始密码");
      }
    },
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOrigin = useCallback(async () => {
    const res = await mutateOrigin(stuNum);
    console.log(res);
  }, [mutateOrigin, stuNum]);
  useEffect(() => {
    handleOrigin();
  }, [handleOrigin]);
  const handelPop = () => {
    if (data.data == null) {
      return;
    }
    if (!(data.data.question_is || data.data.email_is)) {
      setshowPop(true);
    } else {
      navTo({ url: resolvePage("account-safe", "change") });
    }
  };

  return (
    <View>
      {!isLoading && !originLoading ? (
        <View>
          <View className={styles.list}>
            <View className={styles.change}>
              <Text className={styles.textName} onClick={handleOrigin}>
                修改密码
              </Text>
              <Text className={styles.nowState} onClick={handelPop}>
                {PasswordText}
              </Text>
              <Image src={enter} className={styles.enter} />
            </View>
            <View className={styles.setprotect}>
              <Text className={styles.textName}> 设置密保</Text>
              {/* disabled={data.data.question_is} disabled={data.data.email_is} */}
              <Text
                type="default"
                className={styles.nowState}
                onClick={() =>
                  navTo({ url: resolvePage("account-safe", "protect") })
                }
              >
                {data.data && data.data.question_is
                  ? "已设置密保"
                  : "未设置密保"}
              </Text>
              <Image src={enter} className={styles.enter} />
            </View>
            <View className={styles.bindemail}>
              <Text className={styles.textName}>绑定邮箱</Text>
              <Text
                type="default"
                className={styles.nowState}
                onClick={() =>
                  navTo({ url: resolvePage("account-safe", "bindemail") })
                }
              >
                {data.data && data.data.email_is ? "已绑定邮箱" : "未绑定邮箱"}
              </Text>
              <Image src={enter} className={styles.enter} />
            </View>
          </View>

          <View>
            <View
              className={styles.cover}
              style={showPop ? null : "display:none;"}
            />
            <View
              className={showPop ? styles.popWindowActive : styles.popWindow}
            >
              <View className={styles.title}>
                为了账号安全请先设置密保/绑定邮箱
              </View>
              <View
                className={styles.bindemail}
                onTouchEnd
                onClick={() =>
                  navTo({ url: resolvePage("account-safe", "bindemail") })
                }
              >
                绑定邮箱
              </View>
              <View
                className={styles.setprotect}
                onTouchEnd
                onClick={() =>
                  navTo({ url: resolvePage("account-safe", "protect") })
                }
              >
                设置密保
              </View>
              <View className={styles.cancel} onClick={() => setshowPop(false)}>
                取消
              </View>
            </View>
          </View>
        </View>
      ) : (
        <LoadingPage />
      )}
    </View>
  );
};

export default AccountSafe;
