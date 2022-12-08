import { auth } from './auth';

const additionalClaims = {
  admin: true,
};

export function createRoles() {
  let uid = 'Ttxdl5aFWedoNAgGJ0MRFDaRv6M2';
  auth
    .createCustomToken(uid, additionalClaims)
    .then((customToken: any) => {
      return customToken;
    })
    .catch((error: any) => {
      // console.log('Error creating custom token:', error);
    });

  uid = 'cW5vCsElpETTpUJgT6UEDRSxadq2';
  auth
    .createCustomToken(uid, additionalClaims)
    .then((customToken: any) => {
      return customToken;
    })
    .catch((error: any) => {
      // console.log('Error creating custom token:', error);
    });
}
