import * as React from "react";

import { ScoresProps } from "./Scores.d";
import ScoreCounter from "../../ui/ScoreCounter/ScoreCounter";
import Summary from "../../ui/Summary/Summary";
import Stats from "../../ui/Stats/Stats";

const Scores: React.FC<ScoresProps> = () => {
  return (
    <>
      <ScoreCounter />
      <Summary />
      <Stats />
    </>
  );
};

export default Scores;
