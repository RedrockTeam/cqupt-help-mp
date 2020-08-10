import { createContainer } from "unstated-next";
import React, { useState, useCallback, useMemo } from "react";
import Popup, { Props } from "@/common/components/popup";

const usePopup = (initialIsShow = false) => {
  const [isShow, setIsShow] = useState(initialIsShow);
  const [data, setData] = useState<Omit<Props, "isShow">>({});

  const show = useCallback((data: Omit<Props, "isShow">) => {
    setData((oldDate) => Object.assign(oldDate, data));
    setIsShow(true);
    return () => {
      setIsShow(false);
      setData({});
    };
  }, []);

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
