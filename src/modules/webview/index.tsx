import React from "react";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { WebView } from "@tarojs/components";

export default function () {
  const router = useRouter();
  setNavigationBarTitle({
    title: decodeURIComponent(router.params.title || ""),
  });
  const params = Object.entries(router.params)
    .map(([key, value]) =>
      key === "url" || key === "title" ? "" : `${key}=${value}`
    )
    .filter((c) => c !== "")
    .join("&");
  const test =
    "https://wx.redrock.team/game/youyue/#/?t=eyJjbGFzcyI6IjAzMTYxODAxIiwiY29sbGVnZSI6IueOsOS7o%2BmCruaUv%2BWtpumZoiIsImV4cCI6IjEwMjUxOTI2Nzg4IiwiaWF0IjoiMTU5NzIwOTkwOCIsIm1ham9yIjoiIiwicmVhbE5hbWUiOiLliJjpnZkiLCJzdHVOdW0iOiIyMDE4MjExMjE0Iiwic3ViIjoieGJzIn0%3D.AgX8SVJ32276r4ARm2Hb1iOR1VCI3rOfJ2XYkZgOzjAP8hzwx5vQCaaxI9%2Fp8fsOBmWz1MKSCtYIbccLpLX2cvFXbmz90wbvoUZ%2FZEuX423nP1DvpSFBfsWt2pz5GWcnswysZnoEmUUDRRzrNKyx5WtbtRYLMtGr4R%2BrsnpOGGcLErebja%2BySEyvO1087MgeTGrMqzaWgdTGlygBj7VrVdA18Sz5RNCV3L97sGJ4APlqUXRI8l8A%2BUdmcVgk26DUTuAbDxEva5EgLiBShqqMxb9FlIuLjo%2BCm1wFp4cy2a75SDvxsm1WPiMGNZ8BMHqxm0dmxEYM4csyRdCexT8R0w%3D%3D&__key_=15973074039651";
  return (
    <WebView src={`${decodeURIComponent(router.params.url || "")}?${params}`} />
    // <WebView src={test} />
  );
}
