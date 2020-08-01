import React from "react";
import wdyr from "@welldone-software/why-did-you-render";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = wdyr;
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
