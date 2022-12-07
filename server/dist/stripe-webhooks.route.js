"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhooks = void 0;
const database_1 = require("./database");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function stripeWebhooks(req, res) {
    try {
        const signature = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        console.log('stripe-webhooks *', event.type);
        if (event.type == "checkout.session.completed") {
            const session = event.data.object;
            await onCheckoutSessionCompleted(session);
        }
        return res.json({ received: true });
    }
    catch (err) {
        console.log('Error processing webhook event, reason: ', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
}
exports.stripeWebhooks = stripeWebhooks;
async function onCheckoutSessionCompleted(session) {
    console.log('Checkout session completing  ....');
    const purchaseSessionId = session.client_reference_id;
    const { userId, productId } = await (0, database_1.getDocData)(`purchaseSessions/${purchaseSessionId}`);
    if (productId) {
        console.log('update Firebase database :', userId);
        await fulfillProductPurchase(userId, productId, purchaseSessionId, session.customer);
    }
}
async function fulfillProductPurchase(userId, productId, purchaseSessionId, stripeCustomerId) {
    const batch = database_1.db.batch();
    const purchaseSessionRef = database_1.db.doc(`purchaseSessions/${purchaseSessionId}`);
    batch.update(purchaseSessionRef, { status: "completed" });
    const userCoursesOwnedRef = database_1.db.doc(`users/${userId}/productsPurchased/${productId}`);
    batch.create(userCoursesOwnedRef, {});
    const userRef = database_1.db.doc(`users/${userId}`);
    batch.set(userRef, { stripeCustomerId }, { merge: true });
    return batch.commit();
}
//# sourceMappingURL=stripe-webhooks.route.js.map