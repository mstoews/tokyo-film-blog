// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import 'zone.js/plugins/zone-error';

export let environment: { production: boolean; api: { stripeUrl: string; baseUrl: string; createMessage: string; createUser: string }; firebase: { storageBucket: string; apiKey: string; messagingSenderId: string; appId: string; projectId: string; measurementId: string; authDomain: string }; useEmulators: boolean };
environment = {
  firebase: {
    apiKey: "AIzaSyAF8q2eq1tAhBO4PvCeNvVQR7oKy5LYUjw",
    authDomain: "condo-mgmt.firebaseapp.com",
    projectId: "condo-mgmt",
    storageBucket: "condo-mgmt.appspot.com",
    messagingSenderId: "1023314501312",
    appId: "1:1023314501312:web:a7cc0b9047944b25b9d725",
    measurementId: "G-5BFE1ESWF1"
  },
  production: false,
  useEmulators: false,
  api: {
    baseUrl: "https://made-to-dev.df.r.appspot.com",
    stripeUrl: "http://localhost:9000",
    createMessage: "https://us-central1-made-to-dev.cloudfunctions.net/createMessage",
    createUser: "https://us-central1-made-to-dev.cloudfunctions.net/createUser"
  }
};

/*  "http://localhost:9000",
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
