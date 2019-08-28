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
      const hasClient = route.url.hash.split("auth0Client");
      const hasIdToken = route.url.hash.split("id_token");
      if (typeof hasToken[1] !== "undefined") {
        let token = hasToken[1].split("&")[0];
        token = token.substr(1, token.length - 1);
        
        console.info("token", token);
        // 
        // get user id with access token
        authClient.getAuth0UserInfo(token).then((user) => {
          console.info("user", user);
          const auth0Id = user['sub'].split("google-oauth2|")[1];
          setCookie("scordAccessToken", token);
          setCookie("scordAuth0Id", auth0Id);
          
          setTimeout(() => {
            // now check if mongo account exists with id
            authClient.getUserData(null).then((res) => {
              console.info("token res", res)
              if (res['error'].error.title === "Account Not Found") {
                // send to complete profile if not
                window.location.href = window.location.origin + "/account";
              } else {
                // send to scores is yes
                window.location.href = window.location.origin + "/scores";
              }
            })
          }, 500)
        }).catch((err) => {
          console.error("err", err);
        })
      } else if (typeof hasClient[1] !== "undefined") {
        let client = hasClient[1].split("&")[0];
        client = client.substr(1, client.length - 1);
        // setCookie("scordAccessToken", token);
        console.info("client", client);
      } else if (typeof hasIdToken[1] !== "undefined") {
        let token = hasIdToken[1].split("&")[0];
        token = token.substr(1, token.length - 1);
        let userInfo = JSON.parse(window.atob(token.split(".")[1]));

        const auth0Id = userInfo.sub.split("google-oauth2|")[1];

        console.info("token 2", userInfo, auth0Id);
      
        setCookie("scordAuth0Id", auth0Id);

        // setTimeout(() => {
        //   window.location.replace("/");
        // }, 500);
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

const ExportedApp = process.env.NODE_ENV === 'development'
  ? hot(module)(App) // error is thrown by `hot`
  : App;

export default ExportedApp;

// export default hot(module)(App);
