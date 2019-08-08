import * as React from "react";

import { SummaryProps } from "./Summary.d";
import { Callout } from "@blueprintjs/core";

const Summary: React.FC<SummaryProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  return (
    <>
      <section className="summary">
        <div className="summaryContain">
          <h1 className="title">Summary</h1>
          <Callout title="" intent="none">
            Nothing here yet!<br />Please <a href="#!">Sync</a> your fitbit account.
          </Callout>
        </div>
      </section>
    </>
  );
};

export default Summary;
