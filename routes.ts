import { z } from "zod";
import { insertMessageSchema, insertContactSchema, messages, contactSubmissions } from "./schema";

export const api = {
  messages: {
    list: {
      method: "GET" as const,
      path: "/api/messages",
      responses: {
        200: z.array(z.custom<typeof messages.$inferSelect>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/messages",
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
  contact: {
    submit: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertContactSchema,
      responses: {
        201: z.custom<typeof contactSubmissions.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
