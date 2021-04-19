// FIXME:这个东西太折磨了，用了很傻逼的一种写法，以后重写
import React, { Fragment, useState, useEffect } from "react";

import { View, Text, Button, Input, Textarea } from "@tarojs/components";
import PopupContext from "@/stores/popup";
import error from "@/static/images/error.png";
import wait from "@/static/images/wait.png";
import { useMutation } from "react-query/dist/react-query.production.min";
import ImageUpload from "@/common/components/image-upload";
// import BottomPop from "@/common/components/bottomPop";
import styles from "./index.module.scss";
import { useContainer } from "unstated-next";
import {
  timestampToTimeCNString,
  timestampToHMString,
} from "@/common/helpers/date";
import {
  navigateBack,
  setStorage,
  getStorage,
  removeStorage,
  getStorageSync,
} from "@tarojs/taro";
import { applyVolunteerActivity } from "../../services";
import { IVolunteerActivityDetail } from "../../services/dto";
interface IResumeFormProps {
  info: IVolunteerActivityDetail;
  pickerValue: number[];
}
const ResumeForm = ({ info, pickerValue }: IResumeFormProps) => {
  const FORM_INPUT_FIELD_LIST = [10, 15, 9, 8, 1, 16, 4, 5, 11, 6, 7];
  const FORM_TEXTAREA_FIELD_LIST = [3, 12, 13, 14];
  const NeedAdditions = {
    "-1": "不用简历",
    "0": "全选",
    "1": "体重",
    "2": "上传照片",
    "3": "活动经验",
    "4": "擅长语种",
    "5": "英语过级",
    "6": "辅导员姓名",
    "7": "辅导员联系方式",
    "8": "衣服型号",
    "9": "政治面貌",
    "10": "民族",
    "11": "普通话等级",
    "12": "志愿服务经历（校级以上）",
    "13": "学生工作经历（大学期间）",
    "14": "获奖情况（大学期间）",
    "15": "身高",
    "16": "鞋码",
  };
  const [formInputField, setFormInputField] = useState<number[]>([]);
  const [formTextareaField, setFormTextareaField] = useState<number[]>([]);
  // let formInputField: number[] = [];
  // let formTextareaField: number[] = [];

  const initForm = {
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "",
    "9": "",
    "10": "",
    "11": "",
    "12": "",
    "13": "",
    "14": "",
    "15": "",
    "16": "",
  };
  const [imageUrl, setImageUrl] = useState("");
  const Popup = useContainer(PopupContext);
  const [formValue, setFormValue] = useState(initForm);
  // const [focus, setFocus] = useState("");
  // console.log(focus);

  // const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const tmpFormInputField: number[] = [];
    const tmpFormTextareaField: number[] = [];
    getStorage({
      key: "resume",
      success: (res) => {
        console.log(JSON.parse(res.data));
        setFormValue(JSON.parse(res.data));
        setImageUrl(JSON.parse(res.data)["2"]);
      },
      fail: (res) => {
        console.log(res.errMsg);
        setStorage({
          key: "resume",
          data: JSON.stringify(initForm),
        });
      },
    });
    FORM_INPUT_FIELD_LIST.forEach((v: number) => {
      info.need_additions.includes(v) && tmpFormInputField.push(v);
    });
    FORM_TEXTAREA_FIELD_LIST.forEach((v: number) => {
      info.need_additions.includes(v) && tmpFormTextareaField.push(v);
    });
    setFormInputField(tmpFormInputField);
    setFormTextareaField(tmpFormTextareaField);
  }, []);
  const [mutateApply] = useMutation(applyVolunteerActivity, {
    onSuccess(res) {
      if (res.status === 10000) {
        removeStorage({
          key: "resume",
          success: function (res) {
            console.log(res.errMsg);
          },
        });
        const hide = Popup.show({
          title: "申请成功",
          detail: "申请结果将会通过重邮小帮手进行通知",
          img: wait,
        });

        setTimeout(() => {
          hide();
          navigateBack();
        }, 1500);
      } else {
        const hide = Popup.show({
          title: "申请失败",
          detail: "错误",
          img: error,
        });
        setTimeout(() => hide(), 1500);
      }
    },
    onError() {
      const hide = Popup.show({
        title: "申请失败",
        detail: "网络错误",
        img: error,
      });
      setTimeout(() => hide(), 1500);
    },
  });
  type InputProps = {
    label: string;
    seq: string;
  };

  type TextareaProps = InputProps & {
    maxLength?: number;
  };
  const upload = async () => {
    const data = JSON.parse(getStorageSync("resume"));
    const [dateIndex, timePartIndex] = pickerValue;
    const date = info!.detail[dateIndex];
    const timePart = date.time_part_info[timePartIndex];
    if (timePart.now >= timePart.max + 10) {
      const hide = Popup.show({
        title: "申请失败",
        detail: "报名人数已满",
        img: error,
      });
      setTimeout(() => hide(), 1500);
      return;
    }
    if (
      info.need_additions.some((key) => {
        console.log(key, data[key]);

        if (!data[key]) {
          const hide = Popup.show({
            title: "提交失败",
            detail: "请将信息填写完整",
            img: error,
          });
          setTimeout(() => hide(), 1500);
          return true;
        }
      })
    ) {
      return;
    }
    await mutateApply({
      id: date.id,
      begin_time: timePart.begin_time,
      end_time: timePart.end_time,
      addition: JSON.stringify(formValue),
    });
  };
  const FormInput = ({ label, seq }: InputProps) => {
    const [text, setText] = useState(formValue[seq]);
    return (
      <View className={styles.inputWrapper}>
        <Text className={styles.label}>{label}</Text>
        <Input
          // focus={focus == seq}
          className={styles.input}
          type="text"
          name={seq}
          value={text}
          // onFocus={() => setFocus(seq)}
          onInput={(e) => {
            // setFocus(seq);
            const { value } = e.detail;
            setText(value);
            // setFormValue({ ...formValue, [seq]: value });
            getStorage({
              key: "resume",
              success: (res) => {
                const data = JSON.parse(res.data);
                setStorage({
                  key: "resume",
                  data: JSON.stringify({
                    ...data,
                    [seq]: value,
                  }),
                });
              },
            });
          }}
          // onBlur={() => setFocus("")}
        ></Input>
      </View>
    );
  };
  const FormTextarea = ({ label, seq, maxLength = 140 }: TextareaProps) => {
    const [text, setText] = useState(formValue[seq]);

    return (
      <View className={styles.textareaWrapper}>
        <Text className={styles.label}>{label}</Text>
        <Textarea
          // focus={focus == seq}
          className={styles.textarea}
          name={seq}
          maxlength={maxLength}
          // onFocus={() => setFocus(seq)}
          onInput={(e) => {
            // setFocus(seq);
            const { value } = e.detail;
            setText(value);
            // setFormValue({ ...formValue, [seq]: value });
            getStorage({
              key: "resume",
              success: (res) => {
                const data = JSON.parse(res.data);
                setStorage({
                  key: "resume",
                  data: JSON.stringify({
                    ...data,
                    [seq]: value,
                  }),
                });
              },
            });
          }}
          // onBlur={() => setFocus("")}
          value={text}
        ></Textarea>
        <Text className={styles.count}>{`${text.length}/${maxLength}`}</Text>
      </View>
    );
  };
  const renderTimePart = () => {
    const [dateIndex, timePartIndex] = pickerValue;
    const date = info!.detail[dateIndex];
    const timePart = date.time_part_info[timePartIndex];
    return (
      <Text className={styles.time}>{`${timestampToTimeCNString(
        date.date
      ).slice(0, -6)} ${timestampToHMString(
        timePart.begin_time
      )} - ${timestampToHMString(timePart.end_time)}`}</Text>
    );
  };

  return (
    <Fragment>
      <View>
        <View
          className={`${info.need_additions.includes(2) && styles.top} ${
            styles.container
          }`}
        >
          <View className={styles.left}>
            {/* 两个字段 */}
            {formInputField.slice(0, 2).map((v: number) => {
              const seq = v.toString();
              const label = NeedAdditions[seq];
              return <FormInput label={label} seq={seq} />;
            })}
          </View>
          {info.need_additions.includes(2) && (
            <View className={styles.right}>
              <ImageUpload
                className={styles.imageUpload}
                image={imageUrl}
                dispatchImage={(url) => {
                  setImageUrl(url);
                  // setFormValue({ ...formValue, "2": url });
                  getStorage({
                    key: "resume",
                    success: (res) => {
                      const data = JSON.parse(res.data);
                      setFormValue({ ...data, "2": url });
                      setStorage({
                        key: "resume",
                        data: JSON.stringify({
                          ...data,
                          "2": url,
                        }),
                        success: (res) => {
                          console.log(res.errMsg);
                        },
                      });
                    },
                  });
                }}
              />
            </View>
          )}
        </View>
        {formInputField.slice(2).length > 0 && (
          <View className={`${styles.container}`}>
            {formInputField.slice(2).map((v: number) => {
              const seq = v.toString();
              const label = NeedAdditions[seq];
              return <FormInput label={label} seq={seq} />;
            })}
          </View>
        )}
        {formTextareaField.map((v) => {
          const seq = v.toString();
          const label = NeedAdditions[seq];
          return (
            <View className={`${styles.container}`}>
              <FormTextarea label={label} seq={seq} maxLength={400} />
            </View>
          );
        })}
        <View className={`${styles.container2}`}>
          <View className={styles.title}>
            <Text>班次时间</Text>
          </View>
          <View className={styles.time}>{renderTimePart()}</View>
        </View>
        <Button className={styles.submitButton} onClick={upload}>
          确认提交
        </Button>
      </View>
      <Popup.Comp />
      {/* <BottomPop
        isShow={isShow}
        onCancel={() => setIsShow(false)}
        onOk={upload}
        title="退出后所填内容不可保存，确认退出？"
      /> */}
    </Fragment>
  );
};

export default ResumeForm;
