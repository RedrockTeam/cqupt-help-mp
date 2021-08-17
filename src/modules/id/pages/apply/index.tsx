import NavBack from "@/common/components/nav-back";
import icon from "@/static/images/account-icon.png";
import apply from "@/static/images/apply.png";
import input from "@/static/images/id-input.png";
import repeat from "@/static/images/id-repeat.png";
import error from "@/static/images/error.png";
import PopupContext from "@/stores/popup";
import { Button, Image, Input, View } from "@tarojs/components";
import { navigateBack } from "@tarojs/taro";
import React, { useState } from "react";
import {
  useMutation,
  useQuery,
} from "react-query/dist/react-query.production.min";
import { useContainer } from "unstated-next";
import getAssociationsRes from "../../mock/getAssociationsRes.json";
import { applyIdCard, getAssociations } from "../../services";
import styles from "./index.module.scss";

const PAGE_TITLE = "身份有证";

const Apply = () => {
  const [name, setName] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  let { data: associationsRes } = useQuery("getAssociations", getAssociations);
  associationsRes = JSON.parse(JSON.stringify(getAssociationsRes));
  const Popup = useContainer(PopupContext);
  const [mutateApply] = useMutation(applyIdCard);

  const handleClick = async () => {
    if (!associationsRes?.data.includes(name)) {
      const hide = Popup.show({
        img: input,
        title: "请输入正确的社团名称哦~",
      });
      setTimeout(() => {
        hide();
        setName("");
      }, 1500);
      return;
    }
    try {
      const res = await mutateApply({ associationName: name });
      if (res.status === 10000) {
        const hide = Popup.show({
          img: apply,
          title: "申请成功",
          detail: "信息已上传，请耐心等待审核",
        });
        setTimeout(() => {
          hide();
          setName("");
          navigateBack();
        }, 1500);
      } else if (res.status === 10010) {
        const hide = Popup.show({
          img: repeat,
          title: "你已拥有该会员身份了，不要重复申请哦~",
        });
        setTimeout(() => {
          hide();
          setName("");
          navigateBack();
        }, 1500);
      } else {
        const hide = Popup.show({
          title: "申请失败",
          detail: "请稍后再试",
          img: error,
        });
        setTimeout(() => hide(), 1500);
      }
    } catch (e) {
      const hide = Popup.show({
        img: error,
        title: "申请失败",
        detail: "网络错误",
      });
      setTimeout(() => hide(), 1500);
    }
  };

  return (
    <View className={styles.contain}>
      <NavBack title={PAGE_TITLE} background="#FFFFFF" />
      <View className={styles.wrap}>
        <View className={styles.top}>
          <View className={styles.title}>申请新会员</View>
          <View className={styles.tips}>要保证名称信息的正确性哦~</View>
        </View>
        <View>
          <View className={styles.mid}>
            <View className={styles.iconWrap}>
              <Image src={icon} className={styles.icon} mode="aspectFit" />
              <View>组织名称</View>
            </View>
            <View className={styles.inputWrapper}>
              <Input
                className={`${styles.input} ${showSelect ? styles.active : ""}`}
                value={name}
                onInput={(e) => setName(e.detail.value)}
                placeholder="请选择组织名称"
                onFocus={() => setShowSelect(true)}
                onBlur={() => setShowSelect(false)}
              />
              <View
                className={styles.select}
                style={{
                  display: showSelect ? "block" : "none",
                }}
              >
                <View className={styles.itemWrapper}>
                  {associationsRes?.data
                    .filter((group) => group.includes(name))
                    .map((group) => (
                      <View
                        className={styles.item}
                        key={group}
                        onClick={() => setName(group)}
                      >
                        {group}
                      </View>
                    ))}
                </View>
              </View>
            </View>
          </View>
        </View>
        <Button className={styles.btn} onClick={handleClick}>
          申请新证
        </Button>
        <Popup.Comp />
      </View>
    </View>
  );
};

export default Apply;
