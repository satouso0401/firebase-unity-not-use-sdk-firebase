import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";

/* eslint-disable @typescript-eslint/no-var-requires */
const customAuth = require("./handlers/custom-auth");
const customAuthWithDb = require("./handlers/custom-auth-with-db");
/* eslint-enable @typescript-eslint/no-var-requires */

admin.initializeApp();
const expressApp = express();

expressApp.get("/", customAuth.handler);
exports.customAuth = functions
    .region("asia-northeast1").https.onRequest(expressApp);

expressApp.get("/", customAuthWithDb.handler);
exports.customAuthWithDb = functions
    .region("asia-northeast1").https.onRequest(expressApp);

