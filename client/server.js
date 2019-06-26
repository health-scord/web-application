const FitbitApiClient = require("fitbit-node");
const express = require("express");
const rp = require("request-promise");
const https = require("https");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const config = require("../config.js");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./auth_config.json");

const { join } = require("path");
const app = express();

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

const dataServiceEndpoint = `http://${config.dataServiceUri}:${
  config.dataServicePort
}`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static assets from the /public folder
app.use(express.static(join(__dirname, "public")));

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// fetches accounts from data-service api
app.get("/accounts/:id", checkJwt, async (req, res) => {
  try {
    let options = {
      uri: `${dataServiceEndpoint}/accounts/${req.params.id}`,
      method: "GET",
      json: true
    };

    let results = await rp(options);
    return res.send(results);
  } catch (error) {
    console.log(error.toJSON());
  }
});

app.post("/accounts/", checkJwt, async (req, res) => {
  try {
    let options = {
      uri: `${dataServiceEndpoint}/accounts/`,
      method: "POST",
      body: {
        id: req.body.userId
      },
      json: true
    };

    let results = await rp(options);
    return res.send(results);
  } catch (error) {
    console.log(error.toJSON());
  }
});

// fitbit auth stuff
let globalScopeId;
let callbackUrl = `https://${config.serverUri}/authorizeCallback`;

const fitbitClient = new FitbitApiClient({
  clientId: "22DPF6",
  clientSecret: "5f3538567d187a52768935217b220558",
  apiVersion: "1.2" // 1.2 is the default
});

// redirect the user to the Fitbit authorization page
app.post("/accounts/:id/authorizeDevice/fitbit", async (req, res) => {
  try {
    globalScopeId = req.params.id;
    console.log("in authorize route");
    console.log("req.params");
    console.log(req.params);

    let isAccountAuthorized = false;
    //get account details from dataService using id
    //if access token and refresh token are available for account then send user to "this device is already authorized" page or modal.

    if (isAccountAuthorized) {
      return;
    } else {
      console.log(`callbackUrl:`);
      console.log(callbackUrl);
      let url = await fitbitClient.getAuthorizeUrl(
        "activity heartrate location nutrition profile settings sleep social weight",
        callbackUrl
      );
      console.log(url);
      console.log("about to redirect...");
      return res.redirect(url);
    }
  } catch (error) {
    console.log(error);
  }
});

// handle the callback from the Fitbit authorization flow
app.get("/authorizeCallback", async (req, res) => {
  // exchange the authorization code we just received for an access token
  console.log("in callback route");

  let accessTokenResult = await fitbitClient.getAccessToken(
    req.query.code,
    callbackUrl
  );

  let accessToken = accessTokenResult.access_token;
  let refreshToken = accessTokenResult.refresh_token;
  let deviceUserId = accessTokenResult.user_id;

  console.log(deviceUserId);
  console.log(accessToken);
  console.log(refreshToken);

  console.log(`saving access token for id to dataservice /accounts route`);

  console.log(globalScopeId);

  //post this to dataService
  let options = {
    uri: `${dataServiceEndpoint}/accounts/${globalScopeId}`,
    method: "PATCH",
    body: {
      id: globalScopeId,
      devices: [
        {
          make: "fitbit",
          model: "charge3",
          deviceUserId,
          accessToken,
          refreshToken
        }
      ]
    },
    json: true
  };

  try {
    let results = await rp(options);
    console.log(results);
    return res.redirect(`https://${config.serverUri}`);
  } catch (error) {
    console.log(error);
    return res.redirect(`https://${config.serverUri}`);
  }
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + "/certs/server.key", "utf8"),
      cert: fs.readFileSync(__dirname + "/certs/server.cert", "utf8")
    },
    app
  )
  .listen(443);
