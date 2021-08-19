import { GetIdCardRes } from "../services/dto";

export const getIdCardRes: GetIdCardRes = {
  status: 10000,
  info: "success",
  data: [
    {
      type: "组织",
      team_name: "红岩网校工作站",
      team_id: 1,
      title: "站长",
      certification: "红岩网校工作站",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
    {
      type: "组织",
      team_name: "学生会",
      team_id: 2,
      title: "主席",
      certification: "学生会",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
    {
      type: "社团",
      team_name: "爱心社",
      team_id: 3,
      title: "成员",
      certification: "学生社团管理部",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
    {
      type: "社团",
      team_name: "围棋社",
      team_id: 4,
      title: "成员",
      certification: "学生社团管理部",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
  ],
};
