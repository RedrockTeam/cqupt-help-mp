import { BaseRes } from "@/common/helpers/request";

export interface getQuestionList {
    id: number;
    content: string;
}
export type getQuestionLists = getQuestionList[];
export interface getQuestionListsRed extends BaseRes {
    data: getQuestionLists;
}