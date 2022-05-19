const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const OAuthClient = require("intuit-oauth");

const expressApp = express();
expressApp.use(cors({ origin: true }));
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

// authenticate with Quickbooks using Oauth
const urlencodedParser = express.urlencoded({ extended: false });

let oauth2_token_json = "";
let access_token = "";

const oauthClient = new OAuthClient({
  clientId: functions.config().qbconfig.clientid,
  clientSecret: functions.config().qbconfig.clientsecret,
  environment: functions.config().qbconfig.environment,
  redirectUri:
    "https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/callback",
});

expressApp.get("/authUri", urlencodedParser, (_, res) => {
  const authUri = oauthClient.authorizeUri({
    scope: [
      OAuthClient.scopes.Accounting,
      OAuthClient.scopes.Payment,
      OAuthClient.scopes.OpenId,
    ],
    state: "testState",
  });
  res.redirect(authUri);
});

expressApp.get("/callback", (req, res) => {
  const parseRedirect = req.url;
  oauthClient
    .createToken(parseRedirect)
    .then((authResponse) => {
      access_token = authResponse.access_token;
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
      res.send("you can close this window now.");
    })
    .catch((e) => {
      console.error(e);
      console.error(e.intuit_tid);
      res.send(e);
    });
});

expressApp.get("/retrieveToken", (_, res) => {
  res.send(oauth2_token_json);
});

expressApp.get("/refreshAccessToken", (_, res) => {
  oauthClient
    .refresh()
    .then((authResponse) => {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
      res.send(oauth2_token_json);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

expressApp.get("/revokeAccessToken", (_, res) => {
  oauthClient
    .revoke()
    .then(function(authResponse) {
      console.log("Tokens revoked : " + JSON.stringify(authResponse.getJson()));
      access_token = "";
      oauth2_token_json = "";
      res.send(authResponse);
    })
    .catch(function(e) {
      console.error("The error message is :" + e.originalMessage);
      console.error(e.intuit_tid);
    });
});
expressApp.get("/disconnect", (_, res) => {
  console.log("The disconnect called ");
  const authUri = oauthClient.authorizeUri({
    scope: [
      OAuthClient.scopes.Accounting,
      OAuthClient.scopes.Payment,
      OAuthClient.scopes.OpenId,
    ],
    state: "testState",
  });
  res.redirect(authUri);
});

expressApp.get("/getCustomer", (req, res) => {
  const companyID = oauthClient.getToken().realmId;
  const customerQuery = `select * from Customer where PrimaryEmailAddr = '${req.query.query}'`;
  console.log("companyID", "=>", companyID);
  oauthClient
    .makeApiCall({
      //headers: { Authorization: `bearer ${access_token}` },
      url: `${
        functions.config().qbconfig.accountinguri
      }/v3/company/${companyID}/query?query=${customerQuery}&minorversion=59`,
    })
    .then((authResponse) => {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// Full update a customer
expressApp.get("/updateCustomer", (req, res) => {
  const companyID = oauthClient.getToken().realmId;
  //const accessToken = oauthClient.getToken().access_token;
  oauthClient
    .makeApiCall({
      headers: { Authorization: `bearer ${access_token}` },
      url: `${
        functions.config().qbconfig.accountinguri
      }/v3/company/${companyID}/customer?minorversion=59`,
    })
    .then((apiResponse) => {
      console.log(
        "The response for API call is :" + JSON.stringify(apiResponse)
      );
      res.send(JSON.parse(apiResponse.text()));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

expressApp.get("/getInvoicesForCustomer", (req, res) => {
  const companyID = oauthClient.getToken().realmId;
  const customerQuery = `select * from Invoice where CustomerRef = '${req.query.customerId}'`;
  oauthClient
    .makeApiCall({
      //headers: { Authorization: `bearer ${access_token}` },
      url: `${
        functions.config().qbconfig.accountinguri
      }/v3/company/${companyID}/query?query=${customerQuery}&minorversion=59`,
    })
    .then((apiResponse) => {
      res.send(JSON.parse(apiResponse.text()));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

expressApp.get("/getPDFForInvoice", (req, res) => {
  const companyID = oauthClient.getToken().realmId;
  const pdfQuery = req.query.invoiceId;
  oauthClient
    .makeApiCall({
      responseType: "arraybuffer",
      headers: { Accept: "application/pdf", "content-type": "application/pdf" },
      url: `${
        functions.config().qbconfig.accountinguri
      }/v3/company/${companyID}/invoice/${pdfQuery}/pdf?minorversion=62`,
    })
    .then((apiResponse) => {
      let buff = new Buffer.from(apiResponse.data.body);
      let base64data = buff.toString("base64");
      res.status(200).send(base64data);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
      res.send(e.response.data);
    });
});

expressApp.post("/createInvoice", (req, res) => {
  const companyID = oauthClient.getToken().realmId;
  oauthClient
    .makeApiCall({
      headers: {
        Authorization: `bearer ${access_token}`,
      },
      url: `${
        functions.config().qbconfig.paymenturi
      }/v3/company/${companyID}/invoice?minorversion=62`,
    })
    .then((apiResponse) => {
      console.log(
        "The response for API call is :" + JSON.stringify(apiResponse)
      );
      res.send(JSON.parse(apiResponse.text()));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

expressApp.post("/createCustomerBankAccount", (req, res) => {
  const customerId = req.query.customerId;
  //const accessToken = oauthClient.getToken().access_token;
  oauthClient
    .makeApiCall({
      headers: {
        "request-Id": Math.random(),
        Authorization: `bearer ${access_token}`,
      },
      url: `${
        functions.config().qbconfig.paymenturi
      }/quickbooks/v4/customers/${customerId}/bank-accounts`,
    })
    .then((apiResponse) => {
      console.log(
        "The response for API call is :" + JSON.stringify(apiResponse)
      );
      res.send(JSON.parse(apiResponse.text()));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

expressApp.delete("/deleteCustomerBankAccount", (req, res) => {
  const customerId = req.query.customerId;
  const accountId = req.query.accountId;
  //const accessToken = oauthClient.getToken().access_token;
  oauthClient
    .makeApiCall({
      headers: {
        "request-Id": Math.random(),
        Authorization: `bearer ${access_token}`,
      },
      url: `${
        functions.config().qbconfig.paymenturi
      }/quickbooks/v4/customers/${customerId}/bank-accounts/${accountId}`,
    })
    .then((apiResponse) => {
      console.log(
        "The response for API call is :" + JSON.stringify(apiResponse)
      );
      res.send(JSON.parse(apiResponse.text()));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

expressApp.get("/getCustomerBankAccounts", (req, res) => {
  const customerId = req.query.customerId;
  oauthClient
    .makeApiCall({
      //headers: { Authorization: `bearer ${access_token}` },
      url: `${
        functions.config().qbconfig.paymenturi
      }/quickbooks/v4/customers/${customerId}/bank-accounts`,
    })
    .then((apiResponse) => {
      console.log(
        "The response for API call is :" + JSON.stringify(apiResponse)
      );
      res.send(JSON.parse(apiResponse.text()));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

exports.authenticateWithQuickbooks = functions.https.onRequest(expressApp);
