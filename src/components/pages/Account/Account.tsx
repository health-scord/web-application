import * as React from "react";

import { AccountProps } from "./Account.d";
import { Button } from "@blueprintjs/core";
import { useCookies } from "react-cookie";

const Account: React.FC<AccountProps> = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["scordAccessToken"]);

  return (
    <>
      <Button onClick={() => {
        removeCookie("scordAccessToken")
        window.location.href = window.location.origin
      }}>Log Out</Button>
    </>
  );
};

export default Account;
