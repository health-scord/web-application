import { lazy, mount, route } from "navi";
import * as React from "react";

import AppNav from "../components/layout/AppNav/AppNav";
import AuthNav from "../components/layout/AuthNav/AuthNav";
import ConfirmEmail from "../components/pages/ConfirmEmail/ConfirmEmail";
import ForgotPassword from "../components/pages/ForgotPassword/ForgotPassword";
import Login from "../components/pages/Login/Login";
import SignUp from "../components/pages/SignUp/SignUp";
import Strings from "../services/Strings";

const strings = new Strings();
const changeCase = require("change-case");

const routes = mount({
  "/": route(req => {
    return {
      title: "Redirect / Scord",
      head: (
        <>
          <link rel="canonical" href="https://localhost" />
        </>
      ),
      view: (
        <AuthNav />
      ),
    };
  }),
  "/login": route(req => {
    return {
      title: "Login / Scord",
      head: (
        <>
          <link rel="canonical" href="https://localhost/login" />
        </>
      ),
      view: (
        <AuthNav>
          <Login />
        </AuthNav>
      ),
    };
  }),
  "/sign-up": route(req => {
    return {
      title: "Sign Up / Scord",
      head: (
        <>
          <link rel="canonical" href="https://localhost/sign-up" />
        </>
      ),
      view: (
        <AuthNav>
          <SignUp />
        </AuthNav>
      ),
    };
  }),
  "/forgot-password": route(req => {
    return {
      title: "Forgot Password / Scord",
      head: (
        <>
          <link rel="canonical" href="https://localhost/forgot-password" />
        </>
      ),
      view: (
        <AuthNav>
          <ForgotPassword />
        </AuthNav>
      ),
    };
  }),
  // "/reset-password": route(req => {
  //   return {
  //     title: "Reset Password / Scord",
  //     head: (
  //       <>
  //         <link rel="canonical" href="https://localhost/reset-password" />
  //       </>
  //     ),
  //     view: (
  //       <AuthNav>
  //         <ResetPassword />
  //       </AuthNav>
  //     ),
  //   };
  // }),
  "/confirm-email": route(req => {
    return {
      title: "Confirm Email / Scord",
      head: (
        <>
          <link rel="canonical" href="https://localhost/confirm-email" />
        </>
      ),
      view: (
        <AuthNav>
          <ConfirmEmail />
        </AuthNav>
      ),
    };
  }),
});

export default routes;

// TODO: additional configuration
// let route = {
//   url: {
//     pathname: '/navi/core-concepts/',
//     // ...
//   }
//   segments: [/* ... */],
//   title: "Core Concepts",
//   heads: [
//     <meta name="description" content="amazeballs" />, // https://frontarm.com/navi/en/guides/setting-head-meta-title/
//   ],
//   views: [
//     <NaviLayout />,
//     <NaviMDXLayout MDXComponent={/* ... */} />,
//   ],
//   data: {
//     language: 'en',
//   },
// }

// Read more: https://frontarm.com/navi/en/guides/requests-routes-matchers/
// https://frontarm.com/navi/en/guides/nested-views/
// Upload: https://frontarm.com/navi/en/guides/authenticated-routes/
