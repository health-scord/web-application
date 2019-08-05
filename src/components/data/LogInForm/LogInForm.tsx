import * as React from "react";

import { LogInFormProps, LogInFormValues } from "./LogInForm.d";

import {
  Button,
  Callout,
  Card,
  FormGroup,
  InputGroup,
  Tab,
  TabId,
  Tabs,
  Text,
} from "@blueprintjs/core";
import { Form, Formik, FormikActions, FormikProps } from "formik";
import { Link } from "react-navi";
import * as Yup from "yup";
import { useAppContext } from "../../../context";
import AuthClient from "../../../services/AuthClient";
import CheckboxField from "../../ui/CheckboxField/CheckboxField";
import SelectField from "../../ui/SelectField/SelectField";
import TextareaField from "../../ui/TextareaField/TextareaField";
import TextField from "../../ui/TextField/TextField";
import UploadField from "../../ui/UploadField/UploadField";

const LogInForm: React.FC<LogInFormProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const authClient = new AuthClient();

  const [{ mixpanel }, dispatch] = useAppContext();
  const [userDoesNotExist, setUserDoesNotExist] = React.useState(false);
  const [notValidType, setNotValidType] = React.useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = React.useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .email("Invalid email")
      .required("Required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });

  
    return (
      <>
        {notValidType ? (
        <Callout title="Attention" intent="danger">
          Your user is not a valid type. Please contact support.
        </Callout>
      ) : (
        <></>
      )}

      {emailNotConfirmed ? (
        <Callout title="Attention" intent="danger">
          Your email has yet to be confirmed. Please check your email!
        </Callout>
      ) : (
        <></>
      )}

      {userDoesNotExist ? (
        <Callout title="Attention" intent="warning">
          Please try another email and password combination.
        </Callout>
      ) : (
        <></>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(
          values: LogInFormValues,
          actions: FormikActions<LogInFormValues>
        ) => {
          console.log("values", { values, actions });

          mixpanel.track("Log in form submission attempt", {
            env: process.env.NODE_ENV,
            time: new Date(),
            data: {
              values,
            },
          });

          authClient.login(values, (err, res) => {
            if (err) {
              
            }
            if (res.body.success) {
              // window.location.replace("/");
            }
            actions.resetForm();
          });
        }}
        render={(formikBag: FormikProps<LogInFormValues>) => {
          return (
            <Form>
              <TextField
                label="Email"
                fieldName="email"
                fieldPlaceholder="Enter your email address"
                fieldType="email"
              />
              <TextField
                label="Password"
                fieldName="password"
                fieldPlaceholder="Enter your password"
                fieldType="password"
              />
              <Button
                type="submit"
                disabled={formikBag.isSubmitting}
                loading={formikBag.isSubmitting}
              >
                Login
              </Button>
              <Link href="/forgot-password">Forgot Password?</Link>
            </Form>
          );
        }}
      />
      </>
    );
  
};

export default LogInForm;
