import * as React from "react";

import { SummaryProps } from "./Summary.d";
import { Callout } from "@blueprintjs/core";
import { useAppContext } from "../../../context";

const Summary: React.FC<SummaryProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const [{ userData }, dispatch] = useAppContext();
  
  const syncFitbit = () => {
    window.location.href = `${window.location.origin}/accounts/${
      userData.id
    }/authorizeDevice/fitbit`;
  };

  return (
    <>
      <section className="summary">
        <div className="summaryContain">
          <h1 className="title">Summary</h1>
          {typeof userData.devices !== "undefined" && userData.devices.length > 0 ? 
            <Callout title="" intent="none">
              Your account is all set up!
            </Callout> : 
            <Callout title="" intent="none">
              Nothing here yet!<br />
              Please <a href="#!" onClick={syncFitbit}>Sync</a> your fitbit account.
            </Callout>}
        </div>
      </section>
    </>
  );
};

export default Summary;
