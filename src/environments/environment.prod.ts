import { CdkTreeNodeOutlet } from "@angular/cdk/tree";

export const environment = {
  firebase: {
    apiKey: "AIzaSyACFx03sgj-88V0uY871E5vo3rCADg3-Q0",
    authDomain: "cinema-tokyo.firebaseapp.com",
    projectId: "cinema-tokyo",
    storageBucket: "cinema-tokyo.appspot.com",
    messagingSenderId: "722322032580",
    appId: "1:722322032580:web:cd478c37f3052c32578691",
    measurementId: "G-HLTMW3M19H"
  },

  production: true,
  useEmulators: false,
  measurementId: "G-HLTMW3M19H",
  stripe: {
    public_key: 'test',
  },
  api: {
    createMessage: "http://localhost:9000/api/createMessage",
    createAdmin: "http://localhost:9000/api/createAdmin",
    paymentIntent: "http://localhost:9000/api/payment_intent",
  },
};
