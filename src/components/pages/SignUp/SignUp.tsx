import * as React from "react";

import { SignUpProps } from "./SignUp.d";
import { Text, Card } from "@blueprintjs/core";
import SignUpForm from "../../data/SignUpForm/SignUpForm";

const SignUp: React.FC<SignUpProps> = () => {
  return (
    <div className="floatingForm">
      <Text tagName="h1" className="headline">
        Sign Up
      </Text>

      <SignUpForm />
    </div>
  );
};

export default SignUp;
