import * as React from "react";

import { SummaryProps } from "./Summary.d";

const Summary: React.FC<SummaryProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  return <></>;
};

export default Summary;
