"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoles = void 0;
const auth_1 = require("./auth");
const additionalClaims = {
    admin: true,
};
function createRoles() {
    let uid = 'Ttxdl5aFWedoNAgGJ0MRFDaRv6M2';
    auth_1.auth
        .createCustomToken(uid, additionalClaims)
        .then((customToken) => {
        return customToken;
    })
        .catch((error) => {
    });
    uid = 'cW5vCsElpETTpUJgT6UEDRSxadq2';
    auth_1.auth
        .createCustomToken(uid, additionalClaims)
        .then((customToken) => {
        return customToken;
    })
        .catch((error) => {
    });
}
exports.createRoles = createRoles;
//# sourceMappingURL=roles.js.map