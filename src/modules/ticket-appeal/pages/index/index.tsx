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
import { chooseImage, getCurrentInstance, showModal, uploadFile } from '@tarojs/taro';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { getToken } from "@/stores/user";
import PopupContext from "@/stores/popup";
import { useContainer } from "unstated-next";
import error from "@/static/images/error.png";
import { navTo, resolvePage } from '@/common/helpers/utils';
import { postAppeal } from '../../services';
import { useMutation } from 'react-query/dist/react-query.production.min';
import WaitImg from '@/static/images/wait.png';

const PAGE_TITLE = "影票申诉";

const TicketAppealIndex = () => {
  let token: string | undefined;
  getToken().then((res => {
    token = res;
  }));
  const [mutatePush] = useMutation(postAppeal);
  const [ currentInput, setCurrentInput ] = useState(0);
  const [ picNum, setPicNum ] = useState(0);
  const [ picList, setPicList ] = useState<string[]>([]);
  const [ picRes, setPicRes ] = useState<string[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ productId, setProduct ] = useState(getCurrentInstance().router?.params.product_id);
  const [ productName, setProductName ] = useState(getCurrentInstance().router?.params.product_name)
  const textarea = useRef(null);

  const Popup = useContainer(PopupContext);

  const textAreaInputChange = () => {
    setCurrentInput(textarea.current.value.length);
  }

  const handlePush = async (product_id: number, picRes: number[], detail: string) => {
    console.log(picRes);
    const res = await mutatePush({
      product_id,
      detail,
      picture: picRes,
    })
    if (res.status === 200) {
      const hide = Popup.show({
        title: "提交成功，请耐心等待处理结果！",
        img: WaitImg,
      });
      await setTimeout(() => hide(), 3000);
      navTo({ url: resolvePage("feedback", "result") });
      setPicNum(0);
      setPicRes([]);
      setPicList([]);
      setCurrentInput(0);
      setLoading(false);
    } else {
      const hide = Popup.show({
        title: "申请失败",
        detail: "请稍后再试",
      });
      setTimeout(() => hide(), 3000);
    }
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

  const handleUploadImg = (picList, token, picRes) => {
    const n = picList.length;
    console.log(token);
    

    if (n) {
      const promises = picList.map((picSrc) =>
        uploadFile({
          url:
            "https://be-prod.redrock.team/cyb-permissioncenter/upload/file",
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
                title: "提交失败",
                detail: "请稍后再试",
              });
              setTimeout(() => hide(), 1500);
              return;
            }
          }
          handlePush(productId, picRes, currentInput);
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

  // handleUploadImg(picList, token, picRes);

  console.log(getCurrentInstance().router?.params);
  
  
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      <View className={styles.toAppealInfo}>
        <View 
          className={styles.btn}
          onClick={() => navTo({ url: `${resolvePage("ticket-appeal", "record")}?product_id=${productId}&product_name=${productName}`})}
        >申诉记录</View>
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
        onClick={() => handleUploadImg(picList, token, picRes)}
      >提交申诉</Button>

      <Popup.Comp />
    </View>
  )
}
export default TicketAppealIndex;