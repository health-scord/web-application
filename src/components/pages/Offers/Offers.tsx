import * as React from "react";

import { OffersProps } from "./Offers.d";
import Offer from "../../ui/Offer/Offer";
import { useAppContext } from "../../../context";

const Offers: React.FC<OffersProps> = () => {
  const [{ userData }, dispatch] = useAppContext();

  return (
    <>
      <section className="offers">
        <h1 className="headline">My Offers:</h1>
        <div className="offersContain">
          {typeof userData.offers !== "undefined" && userData.offers.length > 0 ? userData.offers.map((offer, i) => {
            return <Offer key={i} offer={offer} />
          }) : <></>}
        </div>
      </section>
    </>
  );
};

export default Offers;
