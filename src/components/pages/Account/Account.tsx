import * as React from "react";

import { AccountProps } from "./Account.d";
import { Button, Text } from "@blueprintjs/core";
import { useCookies } from "react-cookie";
import AuthClient from "../../../services/AuthClient";
import { useAppContext } from "../../../context";
import SignUpForm from "../../data/SignUpForm/SignUpForm";

const Account: React.FC<AccountProps> = () => {
  const authClient = new AuthClient();
  const [{ userData }, dispatch] = useAppContext();
  const [cookies, setCookie, removeCookie] = useCookies(["scordAccessToken", "scordAuth0Id"]);

  return (
    <section className="floatingForm">
      <Text tagName="h1" className="headline darkHeadline">
        Edit Profile
      </Text>
      <SignUpForm initialValues={userData} />
      <Button className="logoutButton" intent="primary" onClick={() => {
        authClient.logout();
      }}>Log Out</Button>
    </section>
  );
};

export default Account;
