import * as React from "react";

import { FooterTabsProps } from "./FooterTabs.d";
import { Link, useCurrentRoute, useNavigation } from "react-navi";
import { Icon, Text } from "@blueprintjs/core";

const FooterTabs: React.FC<FooterTabsProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  let route = useCurrentRoute();
  let navigation = useNavigation();

  const links = [
    {
      path: "/scores",
      icon: "bank-account",
      label: "Score",
      classes: route.url.pathname === "/scores" ? "active" : ""
    },
    {
      path: "/offers",
      icon: "inbox",
      label: "Offers",
      classes: route.url.pathname === "/offers" ? "active" : ""
    },
    {
      path: "/account",
      icon: "home",
      label: "Account",
      classes: route.url.pathname === "/account" ? "active" : ""
    }
  ]

  return (
    <footer className="footerTabs">
      <section className="footerTabsContain">
        {links.map((link, i) => {
          return (
            <div key={i} className={`footerTab ${link.classes}`}>
              <Link href={link.path}>
                <Icon icon={link.icon as any}></Icon>
                <Text tagName="span">{link.label}</Text>
              </Link>
            </div>
          )
        })}
      </section>
    </footer>
  );
};

export default FooterTabs;
