import Cookies from "universal-cookie";
import client from "./ApolloClient";
import RestClient from "./RestClient";

export default class AuthClient {
  public restClient = new RestClient();

  constructor() {}

  async getUserData(dispatch) {
    // const cookies = new Cookies();
    // const hash = cookies.get("");

    // dispatch({
    //   type: "setUserData",
    //   userData,
    // });
  }

  // TODO: use route constants
  signup(values, callback) {
    this.restClient.makeRequest("/user/create-user", values, callback);
  }

  resetPassword(values, callback) {
    this.restClient.makeRequest("/user/reset-password", values, callback);
  }

  resendEmailConfirmation(values, callback) {
    this.restClient.makeRequest(
      "/user/resend-email-confirmation",
      values,
      callback
    );
  }

  forgotPassword(values, callback) {
    this.restClient.makeRequest("/user/forgot-password", values, callback);
  }

  login(values, callback) {
    this.restClient.makeRequest("/user/authenticate", values, callback);
  }

  confirmEmail(values, callback) {
    this.restClient.makeRequest("/user/confirm-email", values, callback);
  }

  logout() {
    // remove cookie and load home
  }
}
