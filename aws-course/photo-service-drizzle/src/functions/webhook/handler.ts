import Boom from '@hapi/boom';
import Stripe from 'stripe';
import { PgConnector } from 'drizzle-orm-pg';
import pg from 'pg';
const { Pool } = pg;

import { Client } from '../../repositories/Client';

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
    const pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: true,
    });
    const connector = new PgConnector(pool);
    const connection = await connector.connect();
    const client = new Client(connection);
    const { albumId, nickname } = eventWebhook.data.object.metadata;

    await client.updateUnlockedPhoto(albumId, nickname);
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
