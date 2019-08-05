import * as React from "react";

import {
  Button,
  Callout,
  Card,
  FormGroup,
  InputGroup,
  Text,
} from "@blueprintjs/core";
import { Form, Formik, FormikActions, FormikProps } from "formik";
import * as Yup from "yup";
import { LoginFormValues, LoginProps } from "./Login.d";

import LogInForm from "../../data/LogInForm/LogInForm";

const Login: React.FC<LoginProps> = () => {
  return (
    <Card className="floatingForm">
      <Text tagName="h1" className="headline">
        Login
      </Text>

      <LogInForm />
    </Card>
  );
};

export default Login;
