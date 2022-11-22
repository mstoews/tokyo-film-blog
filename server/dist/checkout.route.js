"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const database_1 = require("./database");
const firestore_1 = require("@google-cloud/firestore");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function createCheckoutSession(req, res) {
    try {
        const info = {
            courseId: req.body.courseId,
            pricingPlanId: req.body.pricingPlanId,
            callbackUrl: req.body.callbackUrl,
            userId: req["uid"]
        };
        if (!info.userId) {
            const message = 'User must be authenticated.';
            console.log(message);
            res.status(403).json({ message });
            return;
        }
        const purchaseSession = await database_1.db.collection('purchaseSessions').doc();
        const checkoutSessionData = {
            status: 'ongoing',
            created: firestore_1.Timestamp.now(),
            userId: info.userId
        };
        if (info.courseId) {
            checkoutSessionData.courseId = info.courseId;
        }
        else {
            checkoutSessionData.pricingPlanId = info.pricingPlanId;
        }
        await purchaseSession.set(checkoutSessionData);
        const user = await database_1.getDocData(`users/${info.userId}`);
        let sessionConfig, stripeCustomerId = user ? user.stripeCustomerId : undefined;
        if (info.courseId) {
            const course = await database_1.getDocData(`courses/${info.courseId}`);
            sessionConfig = setupPurchaseCourseSession(info, course, purchaseSession.id, stripeCustomerId);
        }
        else if (info.pricingPlanId) {
            sessionConfig = setupSubscriptionSession(info, purchaseSession.id, stripeCustomerId, info.pricingPlanId);
        }
        console.log(sessionConfig);
        const session = await stripe.checkout.sessions.create(sessionConfig);
        res.status(200).json({
            stripeCheckoutSessionId: session.id,
            stripePublicKey: process.env.STRIPE_PUBLIC_KEY
        });
    }
    catch (error) {
        console.log('Unexpected error occurred while purchasing course: ', error);
        res.status(500).json({ error: 'Could not initiate Stripe checkout session' });
    }
}
exports.createCheckoutSession = createCheckoutSession;
function setupSubscriptionSession(info, sessionId, stripeCustomerId, pricingPlanId) {
    const config = setupBaseSessionConfig(info, sessionId, stripeCustomerId);
    config.subscription_data = {
        items: [{ plan: pricingPlanId }]
    };
    return config;
}
function setupPurchaseCourseSession(info, course, sessionId, stripeCustomerId) {
    const config = setupBaseSessionConfig(info, sessionId, stripeCustomerId);
    config.line_items = [
        {
            name: course.titles.description,
            description: course.titles.longDescription,
            amount: course.price * 100,
            currency: 'usd',
            quantity: 1
        }
    ];
    return config;
}
function setupBaseSessionConfig(info, sessionId, stripeCustomerId) {
    const config = {
        payment_method_types: ['card'],
        success_url: `${info.callbackUrl}/?purchaseResult=success&ongoingPurchaseSessionId=${sessionId}`,
        cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
        client_reference_id: sessionId
    };
    if (stripeCustomerId) {
        config.customer = stripeCustomerId;
    }
    return config;
}
//# sourceMappingURL=checkout.route.js.map