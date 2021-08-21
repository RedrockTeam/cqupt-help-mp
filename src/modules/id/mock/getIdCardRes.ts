import { GetIdCardRes } from "../services/dto";

export const getIdCardRes: GetIdCardRes = {
  status: 10000,
  info: "success",
  data: [
    {
      team_leave: "组织",
      team_name: "红岩网校工作站",
      team_id: 1,
      role: "站长",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
    {
      team_leave: "组织",
      team_name: "大学生艺术团",
      team_id: 5,
      role: "团长",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
    {
      team_leave: "组织",
      team_name: "科技联合会",
      team_id: 6,
      role: "会长",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },

    {
      team_leave: "组织",
      team_name: "校学生会",
      team_id: 2,
      role: "主席",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
    {
      team_leave: "社团",
      team_name: "爱心社",
      team_id: 3,
      role: "成员",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
    {
      team_leave: "社团",
      team_name: "围棋社",
      team_id: 4,
      role: "成员",
      start_time: "2021.9.25",
      end_time: "2022.7.1",
    },
  ],
};
