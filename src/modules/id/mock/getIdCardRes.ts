import { GetIdCardRes } from "../services/dto";

export const getIdCardRes: GetIdCardRes = {
  data: [
    {
      team_level: "组织",
      team_name: "社团管理部",
      team_id: 10,
      role: "动漫社 会员",
      start_time: 1629802419,
      end_time: 0,
    },
    {
      team_level: "组织",
      team_name: "社团管理部",
      team_id: 10,
      role: "围棋社 会员",
      start_time: -62135596800,
      end_time: 0,
    },
  ],
  info: "success",
  status: 10000,
};
