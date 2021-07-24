import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";

/* eslint-disable @typescript-eslint/no-var-requires */
const customAuth = require("./handlers/custom-auth");
const customAuthWithDb = require("./handlers/custom-auth-with-db");
const strongEchoOnCall = require("./handlers/strong-echo-on-call");
const strongEchoOnRequest = require("./handlers/strong-echo-on-request");
/* eslint-enable @typescript-eslint/no-var-requires */

admin.initializeApp();
const expressApp = express();

expressApp.get("/", customAuth.handler);
exports.customAuth = functions
    .region("asia-northeast1").https.onRequest(expressApp);

expressApp.get("/", customAuthWithDb.handler);
exports.customAuthWithDb = functions
    .region("asia-northeast1").https.onRequest(expressApp);

exports.strongEchoOnCall = functions
    .region("asia-northeast1").https.onCall(strongEchoOnCall.handler);

expressApp.post("/", strongEchoOnRequest.handler);
exports.strongEchoOnRequest = functions
    .region("asia-northeast1").https.onRequest(expressApp);
