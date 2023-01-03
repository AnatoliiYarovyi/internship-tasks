import Boom from '@hapi/boom';
import Stripe from 'stripe';
import { drizzle } from 'drizzle-orm-pg/node';
import pg from 'pg';
const { Client: ClientDb } = pg;

import { Clients_Photos } from '../../data/repositories/client/Clients_Photos';

const { SECRET_KEY, STRIPE_WEBHOOK_SECRET, DATABASE_URL } = process.env;

const handler = async event => {
  const stripe = new Stripe(SECRET_KEY, {
    // @ts-ignore
    apiVersion: '2022-08-01',
  });
  const sig = event.headers['Stripe-Signature'];
  let eventWebhook: any;

  try {
    eventWebhook = await stripe.webhooks.constructEvent(
      event.body,
      sig,
      STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    throw Boom.badRequest(`Webhook Error: ${error.message}`);
  }

  if (eventWebhook.type === 'checkout.session.completed') {
    const clientDb = new ClientDb({
      connectionString: DATABASE_URL,
      ssl: true,
    });
    await clientDb.connect();
    const connection = drizzle(clientDb);

    const client_photos = new Clients_Photos(connection);
    const { albumId, nickname } = eventWebhook.data.object.metadata;

    await client_photos.updateUnlockedPhoto(albumId, nickname);
  }
  // console.log('\n*** eventWebhook.type ***', eventWebhook.type);

  const data = {
    statusCode: 200,
    body: JSON.stringify({
      received: true,
    }),
  };
  return data;
};

export const webhook = handler;
