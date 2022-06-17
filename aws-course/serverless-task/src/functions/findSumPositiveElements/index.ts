import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.findSumPositiveElements`,
  events: [
    {
      http: {
        method: "post",
        path: "sum-positive-elements",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
