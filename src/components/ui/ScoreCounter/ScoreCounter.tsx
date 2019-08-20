import * as React from "react";

import { ScoreCounterProps } from "./ScoreCounter.d";
import { useAppContext } from "../../../context";

const ScoreCounter: React.FC<ScoreCounterProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const [{ userData }, dispatch] = useAppContext();

  console.info("scorecounter", userData);

  const { calculated } = userData.healthScore;

  return (
    <>
      <section className="scoreCounter">
        <div className="scoreCounterContain">
          <span className="label">Your Health Score:</span>
          {typeof calculated !== "undefined" ? 
            <span className="scoreCount" style={{ color: "#92cf48", opacity: 1 }}>{calculated}</span> 
            : <span className="scoreCount">No data</span>}
          <div className="progressBar">
            <div className="fill" style={{ width: "80%" }}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScoreCounter;
