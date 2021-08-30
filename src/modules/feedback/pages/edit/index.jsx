import { Button, Image, Input, Label, Textarea, View } from "@tarojs/components";
import { getToken } from "@/stores/user";
import React, { useState } from "react";
import { useMutation } from "react-query/dist/react-query.production.min";
import { pushFeedback } from "@/modules/feedback/services";
import { useContainer } from "unstated-next";
import PopupContext from "@/stores/popup";
import Taro from "@tarojs/taro";
import { navTo, resolvePage } from "@/common/helpers/utils";
import error from "@/static/images/error.png";
import styles from "@/modules/feedback/pages/edit/index.module.scss";
import NavBack from "@/common/components/nav-back";
import deletePng from "@/static/images/delete.png";


const Edit = () => {
  const token = getToken();
  const [picSrcs, setPicSrcs] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [contentNum, setContentNum] = useState(0);
  const [picNum, setPicNum] = useState(0);
  const [picRes, setPicRes] = useState([]);
  const [loading, setLoding] = useState(false);
  const [type, setType] = useState();
  const [activeIndex, setActiveIndex] = useState();

  const [mutatePush] = useMutation(pushFeedback);
  const Popup = useContainer(PopupContext);

  const titleChange = (e) => {
    const { value } = e.detail;
    setTitle(value);
  };

  const contentChange = (e) => {
    const { value } = e.detail;
    setContentNum(value.length);
    setContent(value);
  };

  const addPic = () => {
    if (picNum >= 3) {
      Taro.showModal({
        title: "提示",
        content: "最多添加三张图片",
      });
    } else {
      Taro.chooseImage({
        count: 3, // 默认9
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
        success(res) {
          const { tempFilePaths } = res; // 是个数组 tempFilePath可以作为img标签的src属性显示图片
          if (picSrcs.length) {
            const tempLength = picSrcs.length + tempFilePaths.length;
            if (tempLength > 3) {
              Taro.showModal({
                title: "提示",
                content: "最多添加三张图片",
              });
            }
            picSrcs.push(tempFilePaths);
            setPicSrcs([...picSrcs]);
            setPicNum(tempLength);
          } else {
            setPicSrcs(tempFilePaths);
            setPicNum(tempFilePaths.length);
          }
        },
      });
    }
  };

  const deletePic = (index) => {
    picSrcs.splice(index, 1);
    setPicSrcs([...picSrcs]);
    setPicNum([...picSrcs].length);
  };

  const handlePushWithImg = async (picRes) => {
    const [photo1, photo2, photo3] = picRes;

    const res = await mutatePush({
      title,
      detail: content,
      photo1,
      photo2,
      photo3,
    });
    if (res.status === 200) {
      navTo({ url: resolvePage("feedback", "result") });
      setPicNum(0);
      setPicRes();
      setPicSrcs([]);
      setTitle();
      setContent();
      setContentNum();
      setLoding(false);
    } else {
      const hide = Popup.show({
        title: "申请失败",
        detail: "请稍后再试",
      });
      setTimeout(() => hide(), 1500);
    }
  };

  const handlePush = async () => {
    const res = await mutatePush({
      title,
      detail: content,
    });
    if (res.status === 200) {
      navTo({ url: resolvePage("feedback", "result") });
      setTitle();
      setContent();
      setContentNum();
      setLoding(false);
    } else {
      const hide = Popup.show({
        title: "申请失败",
        detail: "请稍后再试",
      });
      setTimeout(() => hide(), 1500);
    }
  };

  const handleUploadImg = (picSrcs, index, token, picRes) => {
    const n = picSrcs.length;

    if (n) {
      const promises = picSrcs.map((picSrc) =>
        Taro.uploadFile({
          url:
            "https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter/upload/file",
          filePath: picSrc,
          name: "file",
          header: {
            Authorization: `Bearer ${token}`,
          },
          success(res) {
            const { data } = res;
            const info = JSON.parse(data);
            picRes.push(info.data.name);
            setPicRes([...picRes]);
            // do something
          },
        })
      );

      Promise.all(promises)
        .then(function (res) {
          for (let i = 0; i < res.length; i++) {
            console.log(res[i]);
            if (res[i].statusCode !== 200) {
              const hide = Popup.show({
                title: "反馈失败",
                detail: "请稍后再试",
              });
              setTimeout(() => hide(), 1500);
              return;
            }
          }
          handlePushWithImg(picRes);
        })
        .catch(function (err) {
          setLoding(false);
          const hide = Popup.show({
            title: "网络异常",
            detail: "请稍后再试",
            img: error,
          });
          setTimeout(() => hide(), 1500);
        });
    } else {
      handlePush();
    }

    // Taro.uploadFile({
    //   url:
    //     "https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter/upload/file",
    //   filePath: picSrcs[index],
    //   name: "file",
    //   header: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   success(res) {
    //     const { data } = res;
    //     const info = JSON.parse(data);
    //     picRes.push(info.data.name);
    //     setPicRes([...picRes]);
    //     // do something
    //   },
    //   complete() {
    //     // index 表示下标 ; n 表示数组长度
    //     if (index + 1 < n) {
    //       handleUploadImg(picSrcs, index + 1, token, picRes);
    //     }
    //     if (index + 1 === n) {
    //       handlePushWithImg(picRes);
    //     }
    //   },
    // });
  };

  const handlePushFeedback = async () => {
    try {
      handleUploadImg(picSrcs, 0, token, picRes);
      setLoding(true);
    } catch (e) {
      const hide = Popup.show({
        img: error,
        title: "申请失败",
        detail: "网络错误",
      });
      setTimeout(() => hide(), 1500);
    }
  };
  // 听不问题类型
  const types = ["意见建议", "系统问题", "账号问题", "其他"];
  const chooseType = (index) => {
    return () => {
      setType(types[index]);
      setActiveIndex(index)
    };
  };

  return (
    <View className={styles.wrapper}>
      <NavBack title="问题和反馈" background="#F6F6F9" />
      <View className={styles.questionTagWrapper}>
        {
          types.map((type, index) => <View key={type} className={styles.questionTag + ' ' + (index === activeIndex ? styles.activeQue : '')} onClick={chooseType(index)}>{type}</View>)
        }
      </View>
      <View className={styles.inputWrapper}>
        <View className={styles.title}>
          <Input
            placeholder="请输入标题(不超过十个字)"
            maxlength="10"
            onInput={(e) => {
              titleChange(e);
            }}
            value={title}
            className={styles.titleInput}
            placeholderClass={styles.titleInputHolder}
          />
        </View>
        <View className={styles.textWrap}>
          <Textarea
            className={styles.text}
            placeholder="请输入您的详细问题和意见，我们会认真看完哒~"
            maxlength={150}
            onInput={(e) => {
              contentChange(e);
            }}
            value={content}
            placeholderClass={styles.textHolder}
          />
          <View className={styles.textNum}>{contentNum}/150</View>
        </View>
        <View className={styles.pic}>
          <View className={styles.picText}>
            <View>相关问题的截图或照片</View>
            <View className={styles.picNum}>{picNum}/3</View>
          </View>
          <View className={styles.picList}>
            {picSrcs.map((item, index) => (
              <View className={styles.picWrap} key={item}>
                <Image src={item} key={item} className={styles.picUp} />
                <Image
                  className={styles.del}
                  src={deletePng}
                  onClick={() => deletePic(index)}
                />
              </View>
            ))}

            <View className={styles.picAdd}>
              <Button className={styles.addBtn} id="add" onClick={addPic} />
              <Label className={styles.addLabel} for="add" />
            </View>
          </View>
        </View>
      </View>

      <Button
        className={title && content ? styles.buttonPush : styles.button}
        disabled={!(title && content)}
        onClick={handlePushFeedback}
      >
        {loading ? "提交中..." : "提交反馈"}
      </Button>
      <View className={styles.tips}>了解更多反馈情况请加QQ群：948304245</View>
      <Popup.Comp />
    </View>
  );
}

export default Edit
