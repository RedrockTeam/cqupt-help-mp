import Empty from "@/common/components/empty";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import SwitchHeader from "@/common/components/switchHeader";
import { timestampToDateString } from "@/common/helpers/date";
import { navTo, resolvePage } from "@/common/helpers/utils";
import { Button, View } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query/dist/react-query.production.min";
// TODO: mock数据，发布时注释
// import { getIdCardRes } from "../../mock/getIdCardRes";
import { getIdCardList } from "../../services";
import styles from "./index.module.scss";

const PAGE_TITLE = "身份有证";

const IdIndex = () => {
  const [active, setActive] = useState(0);
  const [firstRender, setFirstRedner] = useState(true)
  const { data: idCardListRes, isLoading, isError } = useQuery(
    "getIdCardList",
    getIdCardList
  );

  const types = ["组织", "社团"];
  // TODO: mock数据，发布时注释
  // idCardListRes = getIdCardRes;
  /**
   * @description: 根据团队名获取卡片的url，因为小程序只能上传2mb数据，实在是无奈之举，后面有机会可以做一些优化（
   * @param {team_name} 团队名称（与url没有映射关系
   * @return {url} 对应卡片的url
   * @Author: kyingStar
   * @Date: 2021/9/4
   */
  const getImgUrl = (team_name: string, team_level: string) => {
    console.log("渲染图片");

    if (team_level !== "组织") {
      return "http://cdn.redrock.team/id_1_18.png";
    }
    switch (team_name) {
      case "重庆邮电大学招生办新媒体":
        return "http://cdn.redrock.team/id_1_0.png";
      case "大学生通讯社":
        return "http://cdn.redrock.team/id_1_1.png";
      case "大学生艺术团":
        return "http://cdn.redrock.team/id_1_2.png";
      case "电视台":
        return "http://cdn.redrock.team/id_1_3.png";
      case "国旗护卫队":
        return "http://cdn.redrock.team/id_1_4.png";
      case "红岩网校工作站":
        return "http://cdn.redrock.team/id_1_5.png";
      case "科技联合会":
        return "http://cdn.redrock.team/id_1_6.png";
      case "勤工助学中心":
        return "http://cdn.redrock.team/id_1_7.png";
      case "青年志愿者协会":
        return "http://cdn.redrock.team/id_1_8.png";
      case "社团管理部":
        return "http://cdn.redrock.team/id_1_9.png";
      case "团委办公室":
        return "http://cdn.redrock.team/id_1_10.png";
      case "团委宣传部":
        return "http://cdn.redrock.team/id_1_11.png";
      case "团委组织部":
        return "http://cdn.redrock.team/id_1_12.png";
      case "校学生会":
        return "http://cdn.redrock.team/id_1_13.png";
      case "心理互助中心":
        return "http://cdn.redrock.team/id_1_14.png";
      case "新媒体工作站":
        return "http://cdn.redrock.team/id_1_15.png";
      case "新闻中心":
        return "http://cdn.redrock.team/id_1_16.png";
      case "学生处学工助理团":
        return "http://cdn.redrock.team/id_1_17.png";
      case "学生社团联合部":
        return "http://cdn.redrock.team/id_1_18.png";
      case "学生宿舍自我管理与服务协会":
        return "http://cdn.redrock.team/id_1_19.png";
      case "学业互助中心":
        return "http://cdn.redrock.team/id_1_20.png";
      case "阳光校园广播站":
        return "http://cdn.redrock.team/id_1_21.png";
      case "重邮e站微+平台":
        return "http://cdn.redrock.team/id_1_22.png";
      default:
        break;
    }
  };
  // FIXME: 一个由于后端传的数据问题，做的很傻逼的数据转换，建议干掉后端
  useEffect(() => {
    if (idCardListRes && firstRender) {
      setFirstRedner(false)
      idCardListRes.data = idCardListRes.data.map((e) => {
        if (e.team_id === 10) {
          e.team_level = "社团";
          e.team_name = e.role.split(" ")[0];
          e.role = e.role.split(" ")[1];
        } else {
          e.team_level = "组织";
        }
        e.start_time = timestampToDateString(e.start_time as number);
        e.end_time = timestampToDateString(e.end_time as number);
        return e;
      });
    }
  });

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !idCardListRes)
    return <Placeholder title={PAGE_TITLE} isError />;
  console.log("log");

  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#FFFFFF" />
      <SwitchHeader active={active} setActive={setActive} titles={types} />
      <View>
        {idCardListRes.data.length === 0 ? (
          <Empty
            style={{
              padding: "0px",
            }}
            title={PAGE_TITLE}
            detail="证件空空如也哦～"
            suggestion="快去申请新的会员证吧"
            btnContent=""
          />
        ) : (
          idCardListRes.data
            ?.filter((e) => e.team_level === types[active])
            .map((item) => (
              <View
                className={styles.card}
                key={item.team_id + item.team_name}
                style={{
                  backgroundImage: `url(${getImgUrl(
                    item.team_name,
                    item.team_level
                  )})`,
                }}
              >
                <View className={styles.top}>
                  <View className={styles.teamName}>{item.team_name}</View>
                </View>
                <View className={styles.footer}>
                  <View className={styles.title}>{item.role}</View>
                  <View className={styles.time}>
                    {item.start_time} - {item.end_time}
                  </View>
                </View>
              </View>
            ))
        )}
      </View>
      <Button
        className={styles.btn}
        onClick={() =>
          navTo({ url: `${resolvePage("id", "apply")}?type=${types[active]}` })
        }
      >
        申请新证
      </Button>
    </View>
  );
};

export default IdIndex;
