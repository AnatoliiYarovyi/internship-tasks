import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.findFirstPositiveElement`,
  events: [
    {
      http: {
        method: "post",
        path: "first-positive-element",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
