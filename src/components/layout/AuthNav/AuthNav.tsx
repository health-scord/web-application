import * as React from "react";

import { AuthNavProps } from "./AuthNav.d";
import App from "../App/App";
import { Button } from "@blueprintjs/core";
import Header from "../../ui/Header/Header";
import { useCurrentRoute, useLoadingRoute, useNavigation } from "react-navi";
import { useAppContext } from "../../../context";

const AuthNav: React.FC<AuthNavProps> = ({ children }) => {
  let route = useCurrentRoute();
  let loadingRoute = useLoadingRoute();
  let navigation = useNavigation();

  const [{ currentTrack }, dispatch] = useAppContext();

  return (
    <App>
      {/* <Header
        leftElements={<></>}
        rightElements={<></>}
      /> */}
      <section
        style={{
          paddingLeft: 25,
          paddingRight: 25,
          paddingTop: 0,
          background: "linear-gradient(135deg, #492eae, #b25ccd)",
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {children}
      </section>
    </App>
  );
};

export default AuthNav;
