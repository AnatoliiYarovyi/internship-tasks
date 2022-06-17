export default {
  type: "object",
  properties: {
    arrNumbers: { type: "array", items: { type: "number" } },
  },
  required: ["arrNumbers"],
} as const;
