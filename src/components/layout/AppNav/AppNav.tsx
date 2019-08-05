import * as React from "react";

import { AppNavProps } from "./AppNav.d";

import { Link, useCurrentRoute, useNavigation } from "react-navi";

import { useAppContext } from "../../../context";

import {
  Button,
  Icon,
  Menu,
  Popover,
  Position,
  Switch,
  Tag,
  Text,
  Tooltip,
} from "@blueprintjs/core";
import * as $ from "jquery";
import { useCookies } from "react-cookie";
import Strings from "../../../services/Strings";
import Header from "../../ui/Header/Header";
import Logo from "../../ui/Logo/Logo";
import MenuItem from "../../ui/MenuItem/MenuItem";
import App from "../App/App";

const AppNav: React.FC<AppNavProps> = ({ children }) => {
  const strings = new Strings();

  const route = useCurrentRoute();
  const navigation = useNavigation();
  // const [cookies, setCookie, removeCookie] = useCookies([
  //   "reeviewrPrivateHash",
  //   "reeviewrDarkMode",
  // ]);

  const [{ tour, userData }, dispatch] = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  // const [darkMode, setDarkMode] = React.useState(
  //   cookies["reeviewrDarkMode"] === "true" ? true : false
  // );

  let loggedIn = false;
  // if (utility.isDefinedWithContent(userData)) {
  //   loggedIn = true;
  // }

  const openInNewTab = url => {
    const win = window.open(url, "_blank");
    win.focus();
  };

  const navigate = (href, loginCheck = false) => {
    if (loginCheck) {
      if (userData !== null && userData) {
        navigation.navigate(href);
      } else {
        navigation.navigate("/sign-up");
      }
    } else {
      navigation.navigate(href);
    }

    setMobileMenuOpen(false);
  };

  // ATTN: show/hide nav links individually rather than in groups

  return (
    <App>
      <main
        className={`appContainer`}
      >
        <Header
          leftElements={
            <></>
          }
          rightElements={
            <></>
          }
        />

        <section className="mainContent">
          <div className="contentBody">{children}</div>
        </section>
      </main>
    </App>
  );
};

export default AppNav;
