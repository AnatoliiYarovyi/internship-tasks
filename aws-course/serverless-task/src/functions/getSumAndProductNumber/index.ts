import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.getSumAndProductNumber`,
  events: [
    {
      http: {
        method: "post",
        path: "sum-product-number",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
