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
  production: true,
  useEmulators: false,
  api: {
    prdUrl: "https://made-to-server.an.r.appspot.com",
    baseUrl: "https://made-to-server.an.r.appspot.com",
    createMessage: "https://us-central1-made-to-cassie.cloudfunctions.net/createMessage",
    createUser: "https://us-central1-made-to-cassie.cloudfunctions.net/createUser",
  }
};
