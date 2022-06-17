import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.sortUserData`,
  events: [
    {
      http: {
        method: "post",
        path: "sort-data",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
