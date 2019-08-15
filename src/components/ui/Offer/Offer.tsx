import * as React from "react";

import { OfferProps } from "./Offer.d";
import { Button } from "@blueprintjs/core";

const Offer: React.FC<OfferProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  offer = null
}) => {
  const clickHandler = e => onClick(e);
  return (
    <>
      <section className="offer">
        <div className="offerContain">
          <img src={offer.image} alt={offer.title} title={offer.title} />
          <div className="info">
            <span>{offer.title}</span>
            <p>{offer.description}</p>
          </div>
          <div className="interact">
            <Button className="button" onClick={() => window.location.href = offer.link}>Apply Now</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Offer;
