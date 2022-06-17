export default {
  type: "object",
  properties: {
    arrUsers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          birthDate: { type: "string" },
        },
      },
    },
  },
  required: ["arrUsers"],
} as const;
