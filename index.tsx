import window from "global";
import TagManager from "react-gtm-module";

import * as React from "react";
import * as ReactDom from "react-dom";
import RootProvider from "./src/RootProvider";

const bootstrapClient = () => {
  console.info("bootstrap client");

  // TODO: add to ENV
  // const tagManagerArgs = {
  //   gtmId: process.env.GTM,
  // };

  // TagManager.initialize(tagManagerArgs);

  ReactDom.render(<RootProvider />, document.getElementById("app"));
};

bootstrapClient();
