import { GetAssociationsRes } from "../services/dto";

export const getAssociationsRes: GetAssociationsRes = {
  status: 10000,
  info: "success",
  data: [
    "红岩网校工作站",
    "科技联合会",
    "团委组织部",
    "团委办公室",
    "大学生艺术团",
    "校学生会",
    "青年志愿者协会",
    "团委宣传部",
    "电子协会",
    "虚拟现实协会",
    "习近平新时代中国特色社会主义思想学习研究会",
    "硬件技术与应用协会",
    "电子竞技协会",
    "人工智能协会",
  ].map((e, i) => ({ team_name: e, team_id: i })),
};
