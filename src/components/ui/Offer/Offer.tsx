import * as React from "react";

import { OfferProps } from "./Offer.d";

const Offer: React.FC<OfferProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  return <></>;
};

export default Offer;
