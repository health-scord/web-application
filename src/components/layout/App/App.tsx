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
  const [cookies, setCookie, removeCookie] = useCookies(["scordAccessToken"]);

  console.info("cookies", cookies);

  // Global Loading
  // Will users who are logged in be shown a loading symbol on SSR (with JS disabled)?
  

  // Global Redirects
  if (
    cookies['scordAccessToken']
  ) {
    if (
      route.url.pathname === "/"
    ) {
      // when the token is already set as a cookie
      setTimeout(() => {
        navigation.navigate("/scores");
      }, 500)
    } else {
      if (
        userData === null
      ) {
        authClient.getUserData(dispatch);
    
        return (
          <>
            <LoadingIndicator loadingText="Loading user data..." />
          </>
        );
      }
    }
  } else {
    if (
      route.url.pathname === "/"
    ) {
      // when token is retrieved after successful login via auth0
      const hasToken = route.url.hash.split("access_token");
      if (typeof hasToken[1] !== "undefined") {
        let token = hasToken[1].split("&")[0];
        token = token.substr(1, token.length - 1);
        setCookie("scordAccessToken", token);
        window.location.href = window.location.origin + "/scores";
      } else {
        setTimeout(() => {
          navigation.navigate("/login");
        }, 500)
      }
    }
  }

  // Global Analytics
  return <>{children}</>;
};

export default hot(module)(App);
