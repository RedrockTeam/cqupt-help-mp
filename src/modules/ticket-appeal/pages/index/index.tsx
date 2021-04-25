/*
 * @Author: myjdml
 * @Date: 2021-04-13 19:39:49
 * @LastEditTime: 2021-04-15 09:39:11
 * @LastEditors: myjdml
 * @Description: The sooner you start to code, the longer the program will take. —— Roy Carlson
 * @FilePath: \cqupt-help-mp\src\modules\ticket-appeal\pages\index\index.tsx
 * 
 */
import NavBack from '@/common/components/nav-back';
import { Button, View, Textarea } from '@tarojs/components';
import { chooseImage, showModal, uploadFile } from '@tarojs/taro';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { getToken } from "@/stores/user";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import error from "@/static/images/error.png";

const PAGE_TITLE = "影票申诉";

const TicketAppealIndex = () => {
  const token = getToken();
  const [ currentInput, setCurrentInput ] = useState(0);
  const [ picNum, setPicNum ] = useState(0);
  const [ picList, setPicList ] = useState<string[]>([]);
  const [ picRes, setPicRes ] = useState<string[]>([]);
  const [ loading, setLoading ] = useState(false);
  const textarea = useRef(null);

  const Popup = useContainer(PopupContext);

  const textAreaInputChange = () => {
    setCurrentInput(textarea.current.value.length);
  }

  const handleAddPicList = () => {
    chooseImage({
      count: 3 - picNum, // 根据已上传的照片计算剩余可上传的照片
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const { tempFilePaths } = res;
        const tempLength = picNum + tempFilePaths.length;
        if (tempLength > 3) {
          showModal({
            title: "提示",
            content: "最多添加三张图片",
          });
          console.log(picList);
        } else { 
          picList.push(...tempFilePaths);
          setPicList(picList);
          setPicNum(tempLength);
        }
        console.log(res);
        console.log(tempFilePaths);
      }
    })
  }

  const handleUploadImg = (picSrcs, token, picRes) => {
    const n = picSrcs.length;

    if (n) {
      const promises = picSrcs.map((picSrc) =>
        uploadFile({
          url:
            "https://be-prod.redrock.team/cyb-permissioncenter/file",
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
        .then((res: any) => {
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
          // handlePushWithImg(picRes);
        })
        .catch(function (err) {
          // setLoding(false);
          const hide = Popup.show({
            title: "网络异常",
            detail: "请稍后再试",
            img: error,
          });
          setTimeout(() => hide(), 1500);
        });
    } else {
      // handlePush();
    }
   
  };

  handleUploadImg(picList, token, picRes);
  
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      <View className={styles.toAppealInfo}>
        <View className={styles.btn}>申诉记录</View>
      </View>
      <View className={styles.content}>
        <Textarea
          className={styles.textArea}
          placeholder="请输入您的详细申诉理由，我们会认真看完哒~"
          maxlength={300}
          autoFocus
          ref={textarea}
          onInput={textAreaInputChange}
        />
        <View className={styles.textAreaSize}>{currentInput}/300</View>
        <View className={styles.line}></View>
        <View className={styles.picTitle}>
          <View>相关申诉材料（jpg/png）</View>
          <View>{picNum}/3</View>
        </View>
        <View className={styles.picList}>

          <View className={styles.picList}>
            <Button className={styles.addList} onClick={handleAddPicList}/>
            
          </View>
        </View>
      </View>

      <Button 
        className={`${styles.submit} ${loading?styles.unConfirm:styles.confirm}`}
        
      >提交申诉</Button>

      <Popup.Comp />
    </View>
  )
}
export default TicketAppealIndex;