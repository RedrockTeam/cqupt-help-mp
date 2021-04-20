import { BaseRes } from "@/common/helpers/request";

interface TicketAppealListInfo  {
    message: string; // 申诉内容（标题）
    reply: string; // 回复
    pass: 0 | 1 | 2; // 是否通过字段 0/1/2(未处理/已通过/未通过)
    registration_time: number; // 申诉的提交时间(时间戳)
}

export interface TicketAppealListInfoRes extends BaseRes {
    data: TicketAppealListInfo[];
}