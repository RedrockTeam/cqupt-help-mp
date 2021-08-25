import NavBack from "@/common/components/nav-back";
import icon from "@/static/images/account-icon.png";
import error from "@/static/images/error.png";
import apply from "@/static/images/id/id-apply.png";
import input from "@/static/images/id/id-input.png";
import repeat from "@/static/images/id/id-repeat.png";
import PopupContext from "@/stores/popup";
import { Button, Image, Input, View } from "@tarojs/components";
import { navigateBack, useRouter } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
} from "react-query/dist/react-query.production.min";
import { useContainer } from "unstated-next";
// TODO: mock数据，发布时注释
// import { getAssociationsRes } from "../../mock/getAssociationsRes";
import { applyIdCard, getAssociations } from "../../services";
import styles from "./index.module.scss";

const PAGE_TITLE = "身份有证";

const associationList = [
  "爱心社",
  "百闻茶道社",
  "半导体协会",
  "辩论协会",
  "重邮 DS 舞社",
  "畅响室内乐团",
  "创客部落",
  "创业俱乐部",
  "创业者协会",
  "大数据与云计算协会",
  "道路交通安全协会",
  "镝鹤汉服文化协会",
  "电影协会",
  "电子竞技协会",
  "电子商务协会",
  "电子协会",
  "动漫协会",
  "航模协会",
  "花卉绿植社",
  "花样跳绳协会",
  "绘影社",
  "机器人协会",
  "吉他社",
  "健美操协会",
  "健身协会",
  "教育信息化创新创业协会",
  "金融协会",
  "景行辩论社",
  "科幻协会",
  "科技创新协会",
  "兰亭书社",
  "篮球协会",
  "历史协会",
  "绿溢南山环保协会",
  "骆驼社",
  "民族乐器协会",
  "魔方协会",
  "魔术协会",
  "南山文学社",
  "排球协会",
  "跑步爱好者协会",
  "乒乓球协会",
  "人工智能协会",
  "软件技术与应用协会",
  "射艺协会",
  "摄影协会",
  "生命与科学协会",
  "识途社",
  "市场营销协会",
  "手作社",
  "数码协会",
  "数学建模协会",
  "数学俱乐部",
  "跆拳道协会",
  "体育舞蹈协会",
  "天文爱好者协会",
  "天元围棋协会",
  "网球协会",
  "文峰画社",
  "无人驾驶协会",
  "武术协会",
  "物理协会",
  "物联网协会",
  "西乐社",
  "习近平新时代中国特色社会主义思想学习研究会",
  "象棋协会",
  "心理协会",
  "信息安全协会",
  "虚拟现实协会",
  "学生消防志愿者协会",
  "移动互联网创新创业中心",
  "音乐协会",
  "英语俱乐部",
  "硬件技术与应用协会",
  "游设星空协会",
  "羽毛球协会",
  "粤语社",
  "桌游协会",
  "足球协会",
  "ACM 程序设计协会",
  "Bbox&Rap 协会",
  "ERP 协会",
];

const Apply = () => {
  const {
    params: { type },
  } = useRouter();
  const [name, setName] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  let { data: associationsRes } = useQuery("getAssociations", getAssociations);
  // TODO: mock数据，发布时注释
  // associationsRes = getAssociationsRes;
  const [teamNames, setTeamNames] = useState<string[]>([]);
  useEffect(() => {
    if (associationsRes) {
      type === "组织"
        ? setTeamNames(associationsRes.data.map((e) => e.team_name))
        : setTeamNames(associationList);
    }
  }, [associationsRes]);

  const Popup = useContainer(PopupContext);
  const [mutateApply] = useMutation(applyIdCard);

  const handleClick = async () => {
    if (!teamNames.includes(name)) {
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
      const applyData = {
        team_id: associationsRes?.data.find((e) => e.team_name === name)
          ?.team_id,
      };
      if (type === "社团") {
        applyData.team_id = 10;
        // @ts-ignore
        applyData.remarks = name;
      }
      // @ts-ignore
      const res = await mutateApply(applyData);
      if (res!.status === 10000) {
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
      } else if (res!.status === 10010) {
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
      <View className={styles.wrap} onClick={() => setShowSelect(false)}>
        <View className={styles.top}>
          <View className={styles.title}>申请新会员</View>
          <View className={styles.tips}>要保证名称信息的正确性哦~</View>
        </View>
        <View>
          <View className={styles.mid}>
            <View className={styles.iconWrap}>
              <Image src={icon} className={styles.icon} mode="aspectFit" />
              <View>{type}名称</View>
            </View>
            <View className={styles.inputWrapper}>
              <Input
                className={`${styles.input} ${showSelect ? styles.active : ""}`}
                value={name}
                placeholderClass={styles.placeholder}
                onInput={(e) => {
                  setName(e.detail.value);
                }}
                placeholder={`请选择${type}名称`}
                onFocus={() => setShowSelect(true)}
              />
              <View
                className={styles.select}
                style={{
                  display: showSelect ? "block" : "none",
                }}
              >
                <View className={styles.itemWrapper}>
                  {teamNames
                    .filter((teamName) => teamName.includes(name))
                    .map((teamName) => (
                      <View
                        className={styles.item}
                        key={teamName}
                        onClick={() => {
                          setName(teamName);
                          setShowSelect(false);
                        }}
                      >
                        {teamName}
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
