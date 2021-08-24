import React, { useState, useEffect } from "react";
import { View, Image, Text } from "@tarojs/components";
import { chooseImage, uploadFile } from "@tarojs/taro";
import styles from "./index.module.scss";
import { getToken } from "@/stores/user";
type Props = {
  placeholder?: string;
  className?: string;
  image: string;
  dispatchImage: (url: string) => void;
  // onClick?: () => any;
};

const ImageUpload = ({
  placeholder = "上传图片",
  className,
  dispatchImage,
  image,
}: Props) => {
  const token = getToken();
  const [uploaded, setUploaded] = useState<boolean>(false);
  useEffect(() => {
    setUploaded(!!image);
  }, [image]);
  const uploadImage = async (tempFilePaths) => {
    try {
      uploadFile({
        filePath: tempFilePaths[0],
        url:
          "https://be-prod.redrock.cqupt.edu.cn/cyb-permissioncenter/upload/file",
        name: "file",
        header: {
          Authorization: `Bearer ${await token}`,
        },
        success(res) {
          const { data } = res;
          const info = JSON.parse(data);
          dispatchImage(info.data.name);
          setUploaded(true);
        },
      });
    } catch (error) {}
  };
  const upload = () => {
    chooseImage({
      sourceType: ["album", "camera"],
      fail: (res) => {
        console.log(res);
      },
      success: (res) => {
        const { tempFilePaths } = res;
        uploadImage(tempFilePaths);
      },
      count: 1,
      sizeType: ["compressed"],
    });
  };

  return (
    <View className={`${className} ${styles.wrapper}`}>
      {!uploaded ? (
        <View className={styles.inputImage} onClick={upload}>
          <Text>{placeholder}</Text>
        </View>
      ) : (
        <Image src={image} className={styles.img} onClick={upload}></Image>
      )}
    </View>
  );
};

export default ImageUpload;
