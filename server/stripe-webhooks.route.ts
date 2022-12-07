
import {Request, Response} from 'express';
import {db, getDocData} from './database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function stripeWebhooks(req: Request, res:Response) {

    try {

        const signature = req.headers["stripe-signature"];

        const event = stripe.webhooks.constructEvent(
            req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);


        console.log('stripe-webhooks *', event.type);

        if (event.type == "checkout.session.completed") {
            const session = event.data.object;
            await onCheckoutSessionCompleted(session);

        }

        return res.json({received:true});

    }
    catch(err: any) {
        console.log('Error processing webhook event, reason: ', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
}


async function onCheckoutSessionCompleted(session: any) {

    console.log('Checkout session completing  ....')

    const purchaseSessionId = session.client_reference_id;

    const { userId, productId } = await getDocData(`purchaseSessions/${purchaseSessionId}`);

    if (productId) {
        console.log('update Firebase database :', userId )
        await fulfillProductPurchase(userId, productId, purchaseSessionId, session.customer);
    }

}

async function fulfillProductPurchase(userId:string,
                                     productId: string,
                                     purchaseSessionId:string,
                                     stripeCustomerId:string) {

    const batch = db.batch();

    const purchaseSessionRef = db.doc(`purchaseSessions/${purchaseSessionId}`);

    batch.update(purchaseSessionRef, {status: "completed"});

    const userCoursesOwnedRef = db.doc(`users/${userId}/productsPurchased/${productId}`);

    batch.create(userCoursesOwnedRef, {});

    const userRef = db.doc(`users/${userId}`);

    batch.set(userRef, {stripeCustomerId}, {merge: true});

    return batch.commit();

}























