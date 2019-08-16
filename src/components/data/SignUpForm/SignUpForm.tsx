import * as React from "react";

import { SignUpFormProps, SignUpFormValues } from "./SignUpForm.d";

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

const SignUpForm: React.FC<SignUpFormProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  initialValues = null
}) => {
  const authClient = new AuthClient();

  const [{ userData, mixpanel }, dispatch] = useAppContext();
  const [userExists, setUserExists] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = React.useState(false);

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .email("Invalid email")
      .required("Required"),
    username: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    firstName: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    // confirmPassword: Yup.string()
    //   .required("Required")
    //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
    agreeTerms: Yup.boolean().oneOf([true], "Must Accept Terms"),
  });

  const openInNewTab = url => {
    const win = window.open(url, "_blank");
    win.focus();
  };

  if (successfulSubmission) {
    return (
      <Card className="floatingForm darkForm">
        <Text tagName="h1" className="headline">
          Thank you
        </Text>
        <Text tagName="p">
          Welcome to Scord! --- TBD coonfirm email before using or use right away
        </Text>
      </Card>
    );
  } else {
    return (
      <>
        {userExists ? (
          <Callout title="Attention" intent="danger">
            A user with this email address already exists. Try signing in.
          </Callout>
        ) : (
          <></>
        )}

        {invalidPassword ? (
          <Callout title="Attention" intent="danger">
            The password must be at least 8 characters and contain at least 3 of the following 4 types of characters:
            <ol>
              <li>lower case letters (a-z)</li>
              <li>upper case letters (A-Z)</li>
              <li>numbers (i.e. 0-9)</li>
              <li>special characters (e.g. !@#$%^&*)</li>
            </ol>
          </Callout>
        ) : (
          <></>
        )}

        <Formik
          initialValues={initialValues === null ? {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            agreeTerms: false,
          } : initialValues}
          validationSchema={SignUpSchema}
          onSubmit={(
            values: SignUpFormValues,
            actions: FormikActions<SignUpFormValues>
          ) => {
            console.log(
              "values",
              { values, actions }
            );

            // mixpanel.track("Sign up form submission attempt", {
            //   env: process.env.NODE_ENV,
            //   time: new Date(),
            //   data: {
            //     values,
            //   },
            // });

            const callback = (err, res) => {
              console.info("returned", err, res);

              if (err) {
                console.error(err);
                if (res.badRequest) {
                  if (res.body.code === "user_exists") {
                    setUserExists(true);
                  } else {
                    setUserExists(false);
                  }
                  if (res.body.code === "invalid_password") {
                    setInvalidPassword(true);
                  } else {
                    setInvalidPassword(false);
                  }
                }
              }
              if (res.body.id) {
                // redirect to Home
                console.info(
                  "thank you - go confirm your email and complete your profile"
                );
                setSuccessfulSubmission(true);
              }
              actions.resetForm();
            }

            if (initialValues === null) {
              authClient.signup(values, callback);
            } else {
              authClient.updateAccount(userData.id, values, callback);
            }
          }}
          render={(formikBag: FormikProps<SignUpFormValues>) => {
            // console.info("formikbag", formikBag);
            return (
              <Form>
                <>
                {initialValues === null ? <TextField
                    label=""
                    fieldName="email"
                    fieldPlaceholder="Enter your email address"
                    fieldType="email"
                  /> : <></>}
                  <TextField
                    label=""
                    fieldName="username"
                    fieldPlaceholder="User Name"
                    fieldType="username"
                  />
                  <TextField
                    label=""
                    fieldName="firstName"
                    fieldPlaceholder="First Name"
                    fieldType="firstName"
                  />
                  <TextField
                    label=""
                    fieldName="lastName"
                    fieldPlaceholder="Last Name"
                    fieldType="lastName"
                  />
                  {initialValues === null ? 
                    <>
                      <TextField
                        label=""
                        fieldName="password"
                        fieldPlaceholder="Enter your password"
                        fieldType="password"
                      />
                      <CheckboxField
                        label={
                          <>
                            Agree to{" "}
                            <Link
                              href="#!"
                              onClick={() =>
                                window.location.href = "https://localhost/terms"
                              }
                            >
                              Terms
                            </Link>
                          </>
                        }
                        fieldName="agreeTerms"
                      />
                    </> : <></>} 
                  <Button
                    type="submit"
                    disabled={formikBag.isSubmitting}
                    loading={formikBag.isSubmitting}
                    // onClick={() => formikBag.submitForm()}
                  >
                    {initialValues === null ? "Sign Up" : "Save"}
                  </Button>
                </>
              </Form>
            );
          }}
        />
      </>
    );
  }
};

export default SignUpForm;
