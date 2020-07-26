import React, { useState } from "react";
import Taro from '@tarojs/taro'
import { View ,Button, Input, Textarea ,Label ,Image } from "@tarojs/components";
import styles from './index.module.scss'



const Feedback = () => {
  const [picSrcs, setPicSrcs] = useState([])
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [contentNum, setContentNum] = useState(0)
  const [picNum, setPicNum] = useState(0)
  
  const titleChange = (e) => {
    let value = e.detail.value
    setTitle(value)
  }

  const contentChange = (e) => {
    let value = e.detail.value
    setContentNum(value.length)
    setContent(value)
  }

  const pushFeedback = () => {
    console.log('push')
  }

  const addPic = () => {
    console.log('add')
    Taro.chooseImage({
      count: 4, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (res) {
        console.log('loading')
        console.log(res)
        const tempFilePaths = res.tempFilePaths // 是个数组 tempFilePath可以作为img标签的src属性显示图片
        setPicSrcs(tempFilePaths)
        setPicNum(tempFilePaths.length)
        
      }
    })
  
  }
    return (
      <View className={styles.wrapper}>
        <View className={styles.inputWrapper}>
          <View className={styles.title}>
            <Input placeholder='请输入标题(不超过十个字)' onInput={(e) => { titleChange(e) }} value={title} placeholderStyle={{ color: '#a4a3b7'}}></Input>
          </View>
          <View className={styles.text}>
            <Textarea placeholder='请输入您的详细问题和意见，我们会认真看完哒~' onInput={(e) => { contentChange(e) }} value={content} placeholderStyle={{ color: '#a4a3b7' }}></Textarea>
            <View className={styles.textNum}>{contentNum}/150</View>
          </View>
          <View className={styles.pic}>
            <View className={styles.picText}>
              <View>相关问题的截图或照片</View>
              <View className={styles.picNum}>{picNum}/4</View>
            </View>
            <View className={styles.picList}>
              {picSrcs.map((item) => (
                <Image src={item} key={item} className={styles.picUp}></Image>
              ))

              }
              <View className={styles.picAdd}>
                <Button className={styles.addBtn} id='add' onClick={addPic}></Button>
                <Label className={styles.addLabel} for='add'></Label>
              </View>
            
              
            </View>
          </View>
        </View>

        <Button className={(title&&content)?styles.buttonPush:styles.button} disabled={(title&&content)?false:true} onClick={()=>{pushFeedback()}}>提交反馈</Button>
        <View className={styles.tips}>
          了解更多反馈情况请加QQ群：2576373041
        </View>
      </View>
    );
};

export default Feedback;
