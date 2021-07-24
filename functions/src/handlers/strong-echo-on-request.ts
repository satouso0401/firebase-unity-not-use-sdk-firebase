import * as express from "express";
import * as admin from "firebase-admin";

exports.handler = async (req: express.Request, res: express.Response) => {
  admin
      .auth().verifyIdToken(req.body.idToken).then((decodedIdToken) => {
        console.log("uid: ", decodedIdToken.uid);
        const strongEcho = req.body.message + "!";
        res.status(200).json({echoMessage: strongEcho});
      }).catch((error) => {
        console.log("error: ", error);
        res.status(400).json({message: "auth error"});
      });
};

