import React from "react";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { WebView } from "@tarojs/components";

export default function () {
  const router = useRouter();
  setNavigationBarTitle({
    title: decodeURIComponent(router.params.title || ""),
  });
  return <WebView src={decodeURIComponent(router.params.url || "")} />;
}
