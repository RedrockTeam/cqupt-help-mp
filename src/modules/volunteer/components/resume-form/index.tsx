import React, { useState } from "react";
import { View, Text, Button, Input, Form, Textarea } from "@tarojs/components";
import PopupContext from "@/stores/popup";
import error from "@/static/images/error.png";
import wait from "@/static/images/wait.png";
import { useMutation } from "react-query/dist/react-query.production.min";
import ImageUpload from "@/common/components/image-upload";
import styles from "./index.module.scss";
import { useContainer } from "unstated-next";
import {
  timestampToTimeCNString,
  timestampToHMString,
} from "@/common/helpers/date";
import { navigateBack } from "@tarojs/taro";
import { applyVolunteerActivity } from "../../services";
import { VolunteerActivityApply } from "../../services/dto";
const ResumeForm = ({
  info,
  formInputField,
  formTextareaField,
  NeedAdditions,
  pickerValue,
}) => {
  console.log(1);
  const Popup = useContainer(PopupContext);
  const [mutateApply] = useMutation(applyVolunteerActivity, {
    onSuccess(res) {
      if (res.status === 10000) {
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
  const FormInput = ({ label, seq }: InputProps) => {
    return (
      <View className={styles.inputWrapper}>
        <Text className={styles.label}>{label}</Text>
        <Input className={styles.input} type="text" name={seq}></Input>
      </View>
    );
  };
  const FormTextarea = ({ label, seq, maxLength = 140 }: TextareaProps) => {
    const [text, setText] = useState("");
    return (
      <View className={styles.textareaWrapper}>
        <Text className={styles.label}>{label}</Text>
        <Textarea
          className={styles.textarea}
          name={seq}
          maxlength={maxLength}
          onInput={(e) => {
            const { value } = e.detail;
            setText(value);
          }}
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
      <Text>{`${timestampToTimeCNString(date.date).slice(
        0,
        -8
      )} ${timestampToHMString(timePart.begin_time)} - ${timestampToHMString(
        timePart.end_time
      )}`}</Text>
    );
  };

  return (
    <Form
      onSubmit={async (e) => {
        const { value: formValue } = e.detail;
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
        await mutateApply({
          addition: formValue,
          id: date.id,
          begin_time: timePart.begin_time,
          end_time: timePart.end_time,
        });
      }}
    >
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
            <ImageUpload className={styles.imageUpload} />
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
            <FormTextarea label={label} seq={seq} maxLength={300} />
          </View>
        );
      })}
      <View className={`${styles.container2}`}>
        <View className={styles.title}>
          <Text>班次选择</Text>
        </View>
        <View className={styles.time}>{renderTimePart()}</View>
      </View>
      <Button formType="submit" className={styles.submitButton}>
        确认提交
      </Button>
    </Form>
  );
};

function areEqual(prevProps, nextProps) {
  console.log(prevProps);
  console.log(nextProps);
  return true;
}

export default React.memo(ResumeForm, areEqual);
