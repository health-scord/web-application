import * as React from "react";

import { StatsProps } from "./Stats.d";

const Stats: React.FC<StatsProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  return <></>;
};

export default Stats;
