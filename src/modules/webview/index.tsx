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
  return (
    <WebView src={`${decodeURIComponent(router.params.url || "")}?${params}`} />
  );
}
