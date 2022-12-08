"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
const express = require("express");
const checkout_route_1 = require("./checkout.route");
const get_user_middleware_1 = require("./get-user.middleware");
const stripe_webhooks_route_1 = require("./stripe-webhooks.route");
const cors = require("cors");
function initServer() {
    const bodyParser = require('body-parser');
    const app = express();
    app.use(cors());
    app.route("/").get((req, res) => {
        res.status(200).send("<h1>API is up and running!</h1>");
    });
    app.route("/roles").get((req, res) => {
        res.status(200).send("<h1>Updated roles for admin user.</h1>");
    });
    app.route("/api/checkout").post(bodyParser.json(), get_user_middleware_1.getUserMiddleware, checkout_route_1.createCheckoutSession);
    app.route("/stripe-webhooks").post(bodyParser.raw({ type: 'application/json' }), stripe_webhooks_route_1.stripeWebhooks);
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
        console.log("HTTP REST API Server running at port " + PORT);
    });
}
exports.initServer = initServer;
//# sourceMappingURL=server.js.map