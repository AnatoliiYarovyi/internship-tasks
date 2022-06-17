import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const arrNumbers: number[] = event.body.arrNumbers;
  const firstPositiveElement = arrNumbers.find((el) => el > 0);
  const indexFirstPositiveElement = arrNumbers.findIndex(
    (el) => el === firstPositiveElement
  );

  const body = {
    firstPositiveElement,
    indexFirstPositiveElement,
  };
  return formatJSONResponse({
    message: body,
  });
};

export const findFirstPositiveElement = middyfy(handler);
