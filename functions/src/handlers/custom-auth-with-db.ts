import * as express from "express";
import * as admin from "firebase-admin";

exports.handler = async (req: express.Request, res: express.Response) => {
  admin.firestore()
      .collection("serialCodes")
      .where("serialCode", "==", req.query.secretAccessKey)
      .get()
      .then((doc) => {
        admin
            .auth()
            .createCustomToken(doc.docs[0].data().uid)
            .then((customToken) => {
              res.status(200).json({customToken: customToken});
            })
            .catch((error) => {
              console.log("Error creating custom token: ", error);
              res.status(500).json({message: "トークン作成失敗"});
            });
      })
      .catch(() => res.status(500).json({message: "トークン作成失敗"}));
};

