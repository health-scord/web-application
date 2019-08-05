import * as React from "react";

import { LoginHeroProps } from "./LoginHero.d";

const LoginHero: React.FC<LoginHeroProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  return <>
      <section className="loginHero">
        <div className="loginHeroContain">
          <h1>scord</h1>
          <p>Put your fitness data to work for you</p>
        </div>
      </section>
  </>;
};

export default LoginHero;
