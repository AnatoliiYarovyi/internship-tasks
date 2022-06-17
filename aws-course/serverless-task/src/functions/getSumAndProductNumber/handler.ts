import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const value: number = event.body.number;
  const arrNumber: number[] = [];
  for (let i = 1; i <= value; i++) {
    arrNumber.push(i);
  }
  const getSumAndProductNumber = arrNumber.reduce(
    (acc, el, i) => {
      if (i < value) {
        acc.sumNumber += el;
        acc.productNumber *= el;
      }
      return acc;
    },
    { sumNumber: 0, productNumber: 1 }
  );
  const body = {
    getSumAndProductNumber,
  };

  return formatJSONResponse({
    message: body,
  });
};

export const getSumAndProductNumber = middyfy(handler);
