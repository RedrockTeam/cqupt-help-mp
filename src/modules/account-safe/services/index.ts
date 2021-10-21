import request from "@/common/helpers/request";
import { getQuestionLists } from './dto'

//{domain}/user/password/personal修改密码
export const changPassword = ({ Origin, New }) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/user-secret/christinauser/password/personal", {
        // https://run.mocky.io/v3/c0327d69-b08a-43d5-a084-549651041b4f
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: { origin_password: Origin, new_password: New }
    });
//{domain}/user/bind/email/code绑定邮箱信息
export const sentEmailMessage = (email) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/bind/email/code", {
        // https://run.mocky.io/v3/c320935a-1150-4320-b0be-2e59196e1491
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: { email }
    });
//{domain}/user/bind/email验证邮箱密码
export const bindEmail = ({ emailAddress, userCode }) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/bind/email", {
        // https://run.mocky.io/v3/6517388e-1f46-4a69-9307-79837f41d6a1
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: { email: emailAddress, code: userCode }
    });
//{domain}/user/bind/question设置密保问题
export const bindProtect = ({ id, value }) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/bind/question", {
        // https://run.mocky.io/v3/6517388e-1f46-4a69-9307-79837f41d6a1
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: { id: id, content: value }
    });
//{domain}/user/question密保问题信息
export const getQuestionList = (_key: string) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/question", {
        // https://run.mocky.io/v3/54947ed0-55a0-49fb-bdab-839f0ed7292e
        method: "GET"
    });
//{domain}/user/bind/is是否绑定信息
export const getQuesAndEmailState = (account) =>
    // https://run.mocky.io/v3/201b1ee2-e943-46a4-8962-4da5d9fbddc4
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/bind/is", {
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            stu_num: account
        }
    });
//{domain}/user/judge/origin判断是否是默认密码
export const getPasswordState = (account) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/judge/origin", {
        // https://run.mocky.io/v3/d1450784-9056-4697-8a10-50ce39012af0
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            stu_num: account
        }
    });
//{domain}/user/valid/email/code发送找回密码邮箱验证码
export const checkEmail = (account) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/valid/email/code", {
        // https://run.mocky.io/v3/c320935a-1150-4320-b0be-2e59196e1491
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            stu_num: account
        }
    });
//{domain}/user/valid/email验证找回密码邮箱验证码
export const checkEmailCode = ({ email, code, account }) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/valid/email", {
        // https://run.mocky.io/v3/4d229f07-43a8-4b3e-928a-e233864a6e3e
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            email: email,
            code: code,
            stu_num: account
        }
    });
//{domain}/user/bind/email/detail拿到学生绑定的邮箱信息
export const getEmail = (account) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/bind/email/detail", {
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            stu_num: account
        }
    });
//{domain}/user/password/valid修改密码(找回密码)
export const changeNewPassword = ({ account, new_password, code }) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/password/valid", {
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            stu_num: account,
            new_password,
            code
        }
    });
//{domain}/user/bind/question/detail学生绑定的密保信息
export const getProtectQuestion = (account) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/bind/question/detail", {
        // https://run.mocky.io/v3/5a095c4b-2146-474c-9a55-df116c8eb63e
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            stu_num: account
        }
    });
//{domain}/user/valid/question验证密保问题(找回问题)
export const checkAnswer = ({ stu_num, question_id, content }) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/valid/question", {
        // https://run.mocky.io/v3/4d229f07-43a8-4b3e-928a-e233864a6e3e
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            stu_num,
            question_id,
            content
        }
    });
//{domain}/user/judge/password判断原密码是否正确
export const judgePassword = (password) =>
    request<getQuestionLists>("https://be-prod.redrock.cqupt.edu.cn/wxapi/user-secret/christinauser/judge/password", {
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            password: password
        }
    });

