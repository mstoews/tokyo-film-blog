import * as functions from "firebase-functions";
import {createUserApp} from "./create-user";

//
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//

export const createUser = functions.https.onRequest(createUserApp);

export const onAddInventoryUpdateImages =
functions.firestore
    .document("inventory/{inventoryId}")
    .onCreate(async (snap, context)=> {
      functions.logger.debug(`running add
      course trigger for productId ${context.params.inventoryId}`);
    });

