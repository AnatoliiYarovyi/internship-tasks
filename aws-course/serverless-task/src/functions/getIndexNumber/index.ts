import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.getIndexNumber`,
  events: [
    {
      http: {
        method: "get",
        path: "index-number-day",
      },
    },
  ],
};
