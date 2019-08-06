import * as React from "react";

import { FooterTabsProps } from "./FooterTabs.d";

const FooterTabs: React.FC<FooterTabsProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  return <></>;
};

export default FooterTabs;
