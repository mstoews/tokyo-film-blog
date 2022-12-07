"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMiddleware = void 0;
const auth_1 = require("./auth");
function getUserMiddleware(req, res, next) {
    const jwt = req.headers.authorization;
    if (jwt) {
        auth_1.auth.verifyIdToken(jwt)
            .then((jwtPayload) => {
            req["uid"] = jwtPayload.uid;
            next();
        })
            .catch((error) => {
            const message = 'Error verifying the user Id token';
            console.log(message, error);
            res.status(403).json({ message });
        });
    }
    else {
        next();
    }
}
exports.getUserMiddleware = getUserMiddleware;
//# sourceMappingURL=get-user.middleware.js.map