import * as React from "react";

import { ScoreCounterProps } from "./ScoreCounter.d";

const ScoreCounter: React.FC<ScoreCounterProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  return <></>;
};

export default ScoreCounter;
