import * as functions from "firebase-functions";
import {createUserApp} from "./create-user";
import {createMessageApp} from "./create-message";

//
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//

export const createUser = functions.https.onRequest(createUserApp);
export const createMessage = functions.https.onRequest(createMessageApp);
