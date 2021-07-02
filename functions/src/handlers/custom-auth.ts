import * as express from "express";
import * as admin from "firebase-admin";

exports.handler = async (req: express.Request, res: express.Response) => {
  const serialCode = "xxxx-yyyy-zzzz";
  const uid = "uid-0001";
  if (req.query.serialCode == serialCode) {
    admin
        .auth()
        .createCustomToken(uid)
        .then((customToken) => {
          res.status(200).json({customToken: customToken});
        })
        .catch((error) => {
          console.log("Error creating custom token: ", error);
          res.status(500).json({message: "トークン作成失敗"});
        });
  } else {
    res.status(500).json({message: "トークン作成失敗"});
  }
};

