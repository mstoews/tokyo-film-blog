"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocData = exports.db = void 0;
const Firestore = require('@google-cloud/firestore');
const serviceAccountPath = `./service-accounts/${process.env.SERVICE_ACCOUNT_FILE_NAME}`;
exports.db = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: serviceAccountPath
});
async function getDocData(docPath) {
    const snap = await exports.db.doc(docPath).get();
    return snap.data();
}
exports.getDocData = getDocData;
//# sourceMappingURL=database.js.map