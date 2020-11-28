import request from "@/common/helpers/request";
import { getQuestionLists } from './dto'

//{domain}/user/password/personal
export const changPassword = ({ Origin, New }) =>
    request<getQuestionLists>("https://run.mocky.io/v3/c0327d69-b08a-43d5-a084-549651041b4f", {
        method: "POST",
        data: { origin_password: Origin, new_password: New }
    });
//{domain}/user/bind/email/code
export const sentEmailMessage = (email) =>
    request<getQuestionLists>("https://run.mocky.io/v3/c320935a-1150-4320-b0be-2e59196e1491", {
        method: "POST",
        data: { email }
    });
//{domain}/user/bind/email
export const bindEmail = ({ emailAddress, userCode }) =>
    request<getQuestionLists>("https://run.mocky.io/v3/6517388e-1f46-4a69-9307-79837f41d6a1", {
        method: "POST",
        data: { email: emailAddress, userCode }
    });
//{domain}/user/bind/question
export const bindProtect = ({ id, value }) =>
    request<getQuestionLists>("https://run.mocky.io/v3/6517388e-1f46-4a69-9307-79837f41d6a1", {
        method: "POST",
        data: { id: id, content: value }
    });
//{domain}/user/question
export const getQuestionList = (_key: string) =>
    request<getQuestionLists>("https://run.mocky.io/v3/54947ed0-55a0-49fb-bdab-839f0ed7292e", {
        method: "GET"
    });
//{domain}/user/bind/is
export const getQuesAndEmailState = (account) =>
    request<getQuestionLists>("https://run.mocky.io/v3/201b1ee2-e943-46a4-8962-4da5d9fbddc4", {
        method: "POST",
        data: {
            stu_num: account
        }
    });
//{domain}/user/judge/origin
export const getPasswordState = (account) =>
    request<getQuestionLists>("https://run.mocky.io/v3/d1450784-9056-4697-8a10-50ce39012af0", {
        method: "POST",
        data: {
            stu_num: account
        }
    });
//{domain}/user/valid/email/code
export const checkEmail = ({ account, email }) =>
    request<getQuestionLists>("https://run.mocky.io/v3/c320935a-1150-4320-b0be-2e59196e1491", {
        method: "POST",
        data: {
            stu_num: account,
            email: email
        }
    });
//{domain}/user/valid/email
export const checkEmailCode = ({ email, code }) =>
    request<getQuestionLists>("https://run.mocky.io/v3/4d229f07-43a8-4b3e-928a-e233864a6e3e", {
        method: "POST",
        data: {
            email: email,
            code: code
        }
    });
export const getProtectQuestion = (account) =>
    request<getQuestionLists>("https://run.mocky.io/v3/5a095c4b-2146-474c-9a55-df116c8eb63e", {
        method: "POST",
        data: {
            stu_num: account
        }
    });
export const checkAnswer = (infor) =>
    request<getQuestionLists>("https://run.mocky.io/v3/4d229f07-43a8-4b3e-928a-e233864a6e3e", {
        method: "POST",
        data: infor
    });
