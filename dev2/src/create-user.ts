import {auth, db} from "./init";

import express = require("express");
import * as functions from "firebase-functions";
import {getUserCredentialsMiddleware} from "./auth.middleware";

import bodyParser = require("body-parser");
import cors = require("cors");

export const createUserApp = express();

createUserApp.use(bodyParser.json());
createUserApp.use(cors({origin: true}));
createUserApp.use(getUserCredentialsMiddleware);


createUserApp.post("/", async (req, res) => {
  functions.logger.debug("Calling create user function.");

  try {
    if (!(req["uid"] && req["admin"])) {
      const message = "Denied access to user creation service.";
      functions.logger.debug(message);
      res.status(403).json({message});
      return;
    }

    const email = req.body.email;
    const admin = req.body.admin;

    const user = await admin.auth().getUserByEmail(email); // 1
    if (user.customClaims && user.customClaims.moderator === true) {
        return;
    } // 2
    return admin.auth().setCustomUserClaims(user.uid, {
        moderator: true
    }); // 3

    // await auth.setCustomUserClaims(user.uid, {admin});

    db.doc(`users/${user.uid}`).set({});

    res.status(200).json({message: "User created successfully."});
  } catch (err) {
    functions.logger.error("Could not create user.", err);
    res.status(500).json({message: "Could not create user."});
  }
});

