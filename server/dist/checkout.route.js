"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const database_1 = require("./database");
const firestore_1 = require("@google-cloud/firestore");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function createCheckoutSession(req, res) {
    try {
        const info = {
            productId: req.body.productId,
            pricingPlanId: req.body.pricingPlanId,
            callbackUrl: req.body.callbackUrl,
            userId: req['uid'],
        };
        if (!info.userId) {
            const message = 'User must be authenticated to complete a purchase.';
            res.status(403).json({ message });
            return;
        }
        const purchaseSession = await database_1.db.collection('purchaseSessions').doc();
        const checkoutSessionData = {
            status: 'ongoing',
            created: firestore_1.Timestamp.now(),
            userId: info.userId,
        };
        if (info.productId) {
            checkoutSessionData.productId = info.productId;
        }
        await purchaseSession.set(checkoutSessionData);
        const user = await (0, database_1.getDocData)(`users/${info.userId}`);
        let sessionConfig, stripeCustomerId = user ? user.stripeCustomerId : undefined;
        if (info.productId) {
            const prd = await (0, database_1.getDocData)(`inventory/${info.productId}`);
            sessionConfig = setupPurchaseCourseSession(info, prd, purchaseSession.id, stripeCustomerId);
        }
        const session = await stripe.checkout.sessions.create(sessionConfig);
        res.status(200).json({
            stripeCheckoutSessionId: session.id,
            stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: 'Could not initiate Stripe checkout session' });
    }
}
exports.createCheckoutSession = createCheckoutSession;
function setupPurchaseCourseSession(info, product, sessionId, stripeCustomerId) {
    const config = setupBaseSessionConfig(info, sessionId, stripeCustomerId);
    let rich_description = product.rich_description.replace(/(<([^>]+)>)/gi, '');
    config.line_items = [
        {
            name: product.description,
            description: rich_description,
            amount: product.price * 100,
            currency: 'usd',
            quantity: 1,
        },
    ];
    return config;
}
function setupBaseSessionConfig(info, sessionId, stripeCustomerId) {
    const config = {
        payment_method_types: ['card'],
        success_url: `${info.callbackUrl}/?purchaseResult=success&ongoingPurchaseSessionId=${sessionId}`,
        cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
        client_reference_id: sessionId,
    };
    if (stripeCustomerId) {
        config.customer = stripeCustomerId;
    }
    return config;
}
//# sourceMappingURL=checkout.route.js.map