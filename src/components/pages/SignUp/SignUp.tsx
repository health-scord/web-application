import * as React from "react";

import { SignUpProps } from "./SignUp.d";
import { Text, Card, Button } from "@blueprintjs/core";
import SignUpForm from "../../data/SignUpForm/SignUpForm";
import BackButton from "../../ui/BackButton/BackButton";

const SignUp: React.FC<SignUpProps> = () => {
  return (
    <div className="floatingForm">
      <BackButton />
      <Text tagName="h1" className="headline">
        Sign Up
      </Text>

      <SignUpForm />
    </div>
  );
};

export default SignUp;
