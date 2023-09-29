// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
