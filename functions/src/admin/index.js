const admin = require('firebase-admin');

const dotenv = require("dotenv");

const result = dotenv.config();

const serviceAccountPath = `./${process.env.SERVICE_ACCOUNT_FILE_NAME}`;

admin.initializeApp({
   credential: admin.credential.cert(serviceAccountPath),
   databaseURL:process.env.FIRESTORE_DATABASE_URL
});

const auth = admin.auth();

const uid = 'fmhQtGt4JVQ0E1ET1cEXlMhcgZz2';

const customClaims = {
    admin: false,
};

(async() => {
    await auth.setCustomUserClaims(uid, customClaims);
    const user = await auth.getUser(uid);
    console.log('success', user)
    process.exit()
})();
