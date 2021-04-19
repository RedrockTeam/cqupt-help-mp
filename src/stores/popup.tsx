import { createContainer } from "unstated-next";
import React, { useState, useCallback, useMemo } from "react";
import Popup, { Props } from "@/common/components/popup";

const usePopup = (initialIsShow = false) => {
  const [isShow, setIsShow] = useState(initialIsShow);
  const [data, setData] = useState<Omit<Props, "isShow">>({});

  // 解构传默认空值，懒清空之前数据，保证上次数据不会影响这一次
  // 同时实现了 popup 消失时过渡效果不会有内容突然消失
  const show = useCallback(
    ({
      title = "",
      img = "",
      detail = "",
      bottom = null,
      className = "",
    }: Omit<Props, "isShow">) => {
      setData((oldDate) =>
        Object.assign(oldDate, {
          title,
          img,
          detail,
          bottom,
          className,
        })
      );
      setIsShow(true);
      return () => {
        setIsShow(false);
      };
    },
    []
  );

  const Comp = useCallback(
    () => (
      <Popup
        isShow={isShow}
        detail={data.detail}
        img={data.img}
        title={data.title}
        bottom={data.bottom}
        className={data.className}
      />
    ),
    [data.bottom, data.className, data.detail, data.img, data.title, isShow]
  );

  return useMemo(
    () => ({
      Comp,
      show,
    }),
    [Comp, show]
  );
};

const PopupContext = createContainer(usePopup);
export default PopupContext;
