import * as React from "react";

import { AccountProps } from "./Account.d";
import { Button } from "@blueprintjs/core";
import { useCookies } from "react-cookie";
import AuthClient from "../../../services/AuthClient";
import { useAppContext } from "../../../context";

const Account: React.FC<AccountProps> = () => {
  const authClient = new AuthClient();
  const [{ userData }, dispatch] = useAppContext();
  const [cookies, setCookie, removeCookie] = useCookies(["scordAccessToken", "scordAuth0Id"]);

  return (
    <>
      {userData.firstName}
      <Button onClick={() => {
        authClient.logout();
      }}>Log Out</Button>
    </>
  );
};

export default Account;
