import * as functions from "firebase-functions";
import {createUserApp} from "./create-user";
import {addAdminRoleToUser } from './add-admin-role'
import {createMessageApp} from "./create-message";

//
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//

export const createUser = functions.https.onRequest(createUserApp);
export const addAdminRole = functions.https.onRequest(addAdminRoleToUser);
export const createMessage = functions.https.onRequest(createMessageApp);
