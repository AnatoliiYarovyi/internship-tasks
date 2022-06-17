import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const arr = event.body.arrUsers;
  const byField = (field: string) => {
    return (a: any, b: any) => (a[field] > b[field] ? 1 : -1);
  };

  const copyArrForSortName = arr.slice(0);
  const sortName = copyArrForSortName.sort(byField("firstName"));

  const copyArrForSortBirthDate = arr.slice(0);
  const sortBirthDate = copyArrForSortBirthDate
    .sort(byField("birthDate"))
    .reverse();
  const body = { sortName, sortBirthDate };

  return formatJSONResponse({
    message: body,
  });
};

export const sortUserData = middyfy(handler);
