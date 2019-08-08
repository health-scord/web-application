import Cookies from "universal-cookie";
import client from "./ApolloClient";
import RestClient from "./RestClient";
import createAuth0Client from "@auth0/auth0-spa-js";
import config from "../../client/auth_config.json";
import * as $ from "jquery";


export default class AuthClient {
  public auth0;
  public restClient = new RestClient();

  constructor() {
    this.init();
  }

  async init() {
    this.auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId,
      redirect_uri: window.location.origin
    });
  }

  async getUserData(dispatch) {
    // const cookies = new Cookies();
    // const hash = cookies.get("");

    // dispatch({
    //   type: "setUserData",
    //   userData,
    // });
  }

  // TODO: use route constants
  async signup(values, callback) {
    this.restClient.makeRequest(
      "https://" + config.domain + "/dbconnections/signup", 
      {
        "client_id": config.clientId,
        "connection": "Username-Password-Authentication",
        ...values
      }, 
      callback, 
      "POST", 
      { "content-type": "application/x-www-form-urlencoded" },
      false
    );
  }

  // resetPassword(values, callback) {
  //   this.restClient.makeRequest("/user/reset-password", values, callback);
  // }

  // resendEmailConfirmation(values, callback) {
  //   this.restClient.makeRequest(
  //     "/user/resend-email-confirmation",
  //     values,
  //     callback
  //   );
  // }

  // forgotPassword(values, callback) {
  //   this.restClient.makeRequest("/user/forgot-password", values, callback);
  // }

  login(values, callback) {
    this.restClient.makeRequest("/user/authenticate", values, callback);
  }

  // confirmEmail(values, callback) {
  //   this.restClient.makeRequest("/user/confirm-email", values, callback);
  // }

  // logout() {
  //   // remove cookie and load home
  // }
}
