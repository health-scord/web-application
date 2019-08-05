import * as React from "react";

import { LoginHeroProps } from "./LoginHero.d";
import { Text } from "@blueprintjs/core";

const LoginHero: React.FC<LoginHeroProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  return (
    <section className="loginHero">
      <div className="loginHeroContain">
        <Text tagName="h1">scord</Text>
        <Text tagName="p">Put your fitness data to work for you</Text>
      </div>
    </section>
  );
};

export default LoginHero;
