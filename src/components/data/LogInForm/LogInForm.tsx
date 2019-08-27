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

  const [{ userData }, dispatch] = useAppContext();
  const [userDoesNotExist, setUserDoesNotExist] = React.useState(false);
  const [tooManyLoginAttempts, setTooManyLoginAttempts] = React.useState(false);
  const [generalError, setGeneralError] = React.useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });

  return (
    <>
    {userDoesNotExist ? (
      <Callout title="Attention" intent="warning">
        Please try another email and password combination.
      </Callout>
    ) : (
      <></>
    )}

    {tooManyLoginAttempts ? (
      <Callout title="Attention" intent="warning">
        Your account has been blocked after multiple consecutive login attempts.
      </Callout>
    ) : (
      <></>
    )}

    {generalError ? (
      <Callout title="Attention" intent="warning">
        There was an error logging in.
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

        // mixpanel.track("Log in form submission attempt", {
        //   env: process.env.NODE_ENV,
        //   time: new Date(),
        //   data: {
        //     values,
        //   },
        // });

        authClient.login(
          { 
            username: values.email,
            password: values.password 
          }, 
          (err, res) => {
            if (err) {
              console.error("err", err);
            }
            // if (res['body']['access_token']) {
            //   console.info('success');
            //   // window.location.replace("/");
            // }
            actions.resetForm();
          },
          (err) => {
            console.error("ERROR LOGIN:", err, err.message, err.response);

            actions.setSubmitting(false);

            // TODO: dynamic errors like sign up
            // https://auth0.com/docs/libraries/error-messages
            if (err.response) {
              setTooManyLoginAttempts(false);
              setUserDoesNotExist(false);
              setGeneralError(false);

              switch (err.response.body.error) {
                case "too_many_attempts":
                  setTooManyLoginAttempts(true);
                  break;

                case "invalid_grant":
                  setUserDoesNotExist(true);
                  break;
            
                default:
                  setGeneralError(true);
                  break;
              }
            }
          }
        );
      }}
      render={(formikBag: FormikProps<LogInFormValues>) => {
        return (
          <Form>
            <TextField
              label=""
              fieldName="email"
              fieldPlaceholder="Email"
              fieldType="email"
            />
            <TextField
              label=""
              fieldName="password"
              fieldPlaceholder="Password"
              fieldType="password"
            />
            <Link className="note forgotPassword" href="/forgot-password">Forgot your password?</Link>
            <Button
              type="submit"
              className="button loginButton"
              disabled={formikBag.isSubmitting}
              loading={formikBag.isSubmitting}
            >
              Login
            </Button>
            
          </Form>
        );
      }}
    />

      <Button className="button loginButton" onClick={() => authClient.socialLogin("google-oauth2", () => console.info("finished"))}>
        Login with Google
      </Button>
      <Button className="button loginButton" onClick={() => authClient.socialLogin("facebook", () => console.info("finished"))}>
        Login with Facebook
      </Button>

      <Text className="note" tagName="p">Don't have an account? <Link href="/sign-up">Sign Up</Link></Text>
    </>
  );
};

export default LogInForm;
