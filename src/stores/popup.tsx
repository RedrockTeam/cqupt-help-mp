import { createContainer } from "unstated-next";
import React, { useState } from "react";
import Popup, { Props } from "@/common/components/popup";

const usePopup = (initialIsShow = false) => {
  const [isShow, setIsShow] = useState(initialIsShow);
  const [data, setData] = useState<Omit<Props, "isShow">>({});

  const show = (data: Omit<Props, "isShow">) => {
    setData((oldDate) => Object.assign(oldDate, data));
    setIsShow(true);
    return () => {
      setIsShow(false);
      setData({});
    };
  };

  return {
    Comp: () => (
      <Popup
        isShow={isShow}
        detail={data.detail}
        img={data.img}
        title={data.title}
        bottom={data.bottom}
        className={data.className}
      />
    ),
    show,
  };
};

const PopupContext = createContainer(usePopup);
export default PopupContext;
