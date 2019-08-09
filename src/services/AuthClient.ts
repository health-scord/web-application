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
    // auth0 user create
    this.restClient.makeRequest(
      "https://" + config.domain + "/dbconnections/signup", 
      {
        "client_id": config.clientId,
        "connection": "Username-Password-Authentication",
        ...values
      }, 
      () => console.info("Step 1 finished"), 
      "POST", 
      { "content-type": "application/x-www-form-urlencoded" },
      false
    ).then((res) => {
      console.info("res", res, values)
      // data-service user create
      if (typeof res['body']['_id'] !== "undefined") {
        this.restClient.makeRequest(
          "/accounts", 
          {
            "id": res['body']['_id'],
            ...values
          }, 
          callback, // finish
          "POST", 
          { "content-type": "application/json" },
          false
        )
      } else {
        console.error(res);
      }
    });
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

  async login(values, callback) {
    // this.restClient.makeRequest("/user/authenticate", values, callback);
    
    this.restClient.makeRequest(
      "https://" + config.domain + "/oauth/token", 
      {
        grant_type: "password",
        client_id: config.clientId,
        // client_secret
        // audience
        // scope
        // realm
        ...values
      }, 
      callback,
      "POST", 
      { "content-type": "application/x-www-form-urlencoded" },
      false
    ).then(res => {
      console.info("login res", res);

      // let token = await this.auth0.getTokenSilently();
      // let userProfile = JSON.stringify(await this.auth0.getUser());
    })
  }

  // confirmEmail(values, callback) {
  //   this.restClient.makeRequest("/user/confirm-email", values, callback);
  // }

  // logout() {
  //   // remove cookie and load home
  // }
}
