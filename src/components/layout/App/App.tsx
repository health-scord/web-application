import * as React from "react";
import { hot } from "react-hot-loader";

import { useCookies } from "react-cookie";
import { useCurrentRoute, useNavigation } from "react-navi";
import { useAppContext } from "../../../context";
import AuthClient from "../../../services/AuthClient";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import { AppProps } from "./App.d";

const App: React.FC<AppProps> = ({ children }) => {
  const authClient = new AuthClient();

  const [{ userData }, dispatch] = useAppContext();
  const route = useCurrentRoute();
  const navigation = useNavigation();

  // consider creating auth0 hooks package
  const [cookies, setCookie, removeCookie] = useCookies([
    "reeviewrPrivateHash",
    "reeviewrDarkMode",
  ]);

  // Global Loading
  // Will users who are logged in be shown a loading symbol on SSR (with JS disabled)?
  if (
    false
  ) {
    authClient.getUserData(dispatch);

    return (
      <>
        <LoadingIndicator loadingText="Loading user data..." />
      </>
    );
  }

  // Global Redirects
  if (
    false
  ) {
    if (
      route.url.pathname === "/"
    ) {
      setTimeout(() => {
        navigation.navigate("/list");
      }, 500)
    }
  } else {
    if (
      route.url.pathname === "/"
    ) {
      setTimeout(() => {
        navigation.navigate("/login");
      }, 500)
    }
  }

  // Global Analytics
  return <>{children}</>;
};

export default hot(module)(App);
