import { CdkTreeNodeOutlet } from "@angular/cdk/tree";

export const environment = {
  firebase: {
    projectId: 'made-to-cassie',
    appId: '1:819679326368:web:8bf0a91436ec18a06019c5',
    storageBucket: 'made-to-cassie.appspot.com',
    locationId: 'asia-east2',
    apiKey: 'AIzaSyB0kkt0xQJbdFwd9Fnh1F7x6taE30F76ME',
    authDomain: 'made-to-cassie.firebaseapp.com',
    messagingSenderId: '819679326368',
    measurementId: 'G-WGMMJK9NR3',
  },
  production: false,
  useEmulators: false,
  gtm_id: "G-WGMMJK9NR3",
  stripe: {
    public_key: 'pk_  test_51JogSuCGT3ceZF7pYLMW9IZjEOaMGFqz5YOoBaNGTgT8dl72ThRvLgfx1DEFlQPteFpFlwgfpJLPnuJ1X60UCc8m00yEl0F8ra',
  },
  dev: {
    createMessage: "http://localhost:9000/api/createMessage",
    createAdmin: "http://localhost:9000/api/createAdmin",
  },
  api: {
    prdUrl: "https://made-to-cassie.df.r.appspot.com",
    baseUrl:  "http://localhost:9000",
    stripeDevUrl: "https://made-to-dev.df.r.appspot.com",
    createMessage: "https://made-to-cassie.df.r.appspot.com/api/createMessage",
    createUser: "https://made-to-cassie.df.r.appspot.com/api/createUser",
    createAdmin: "https://made-to-cassie.df.r.appspot.com/api/createAdmin",
  }
};
