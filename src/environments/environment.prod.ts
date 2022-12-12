export const environment = {
  firebase: {
    apiKey: "AIzaSyB0kkt0xQJbdFwd9Fnh1F7x6taE30F76ME",
    authDomain: "made-to-cassie.firebaseapp.com",
    projectId: "made-to-cassie",
    storageBucket: "made-to-cassie.appspot.com",
    messagingSenderId: "819679326368",
    appId: "1:819679326368:web:8bf0a91436ec18a06019c5",
    measurementId: "G-WGMMJK9NR3"
  },
  production: true,
  useEmulators: false,
  api: {
    baseUrl: "http://localhost:9000",
    createMessage: "http://localhost:5001/made-to-cassie.firebaseapp.com/createMessage",
    createUser: "http://localhost:5001/createUser",
  },
  emulator: {
    createMessage: "http://localhost:5001/made-to-cassie.firebaseapp.com/createMessage",
    createUser: "http://localhost:5001/createUser",
  }
};
