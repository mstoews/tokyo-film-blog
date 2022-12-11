import {db} from "./init";

import express = require("express");
import * as functions from "firebase-functions";
import {getUserCredentialsMiddleware} from "./auth.middleware";

import bodyParser = require("body-parser");
import cors = require("cors");

export const createMessageApp = express();

createMessageApp.use(bodyParser.json());
createMessageApp.use(cors({origin: true}));
createMessageApp.use(getUserCredentialsMiddleware);

createMessageApp.post("/", async (req, res) => {
  functions.logger.debug("Calling create user contact message.");
  try {
    const contactMessage = {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      message: req.body.message,
    };
    db.doc("contacts/").set({contactMessage});
    res.status(200).json({message: "Contact message created successfully."});
  } catch (err) {
    functions.logger.error("Could not create user.", err);
    res.status(500).json({message: "Could not create user."});
  }
});

