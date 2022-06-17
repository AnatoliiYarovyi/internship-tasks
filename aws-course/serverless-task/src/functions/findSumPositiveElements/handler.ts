import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const arrNumbers: number[] = event.body.arrNumbers;
  const sumPositiveElement: number = arrNumbers.reduce((acc: number, el) => {
    if (el > 0) {
      acc += el;
    }
    return acc;
  }, 0);
  const body = {
    sumAllPositiveElement: sumPositiveElement,
  };

  return formatJSONResponse({
    message: body,
  });
};

export const findSumPositiveElements = middyfy(handler);
