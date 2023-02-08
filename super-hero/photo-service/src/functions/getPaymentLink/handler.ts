import Boom from '@hapi/boom';
import Stripe from 'stripe';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

const { SECRET_KEY } = process.env;

const handler = async (event: Event) => {
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { albumId } = event.queryStringParameters;

  const stripe = new Stripe(SECRET_KEY, {
    // @ts-ignore
    apiVersion: '2022-08-01',
  });
  const PRICE_ID = 'price_1M4RYLAuVXAUtFS8TSPeMqsV';

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      metadata: {
        albumId,
        nickname,
      },
    });

    return {
      paymentLink: paymentLink.url,
      metadata: paymentLink.metadata,
    };
  } catch (error) {
    throw Boom.badRequest(error.mesagge);
  }
};

export const getPaymentLink = middyfy(handler);
