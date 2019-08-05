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
import LoginHero from "../../ui/LoginHero/LoginHero";

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="centerPageContent">
      <div className="floatingForm">
        <LoginHero />
        <LogInForm />
      </div>
    </div>
  );
};

export default Login;
