import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  author: text("author").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  city: text("city"),
  travelMonth: text("travel_month"),
  selectedPackage: text("selected_package"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  duration: text("duration").notNull(),
  hotels: text("hotels").notNull(),
  roomType: text("room_type").notNull(),
  inclusions: text("inclusions").notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  content: true,
  author: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
  city: true,
  travelMonth: true,
  selectedPackage: true,
}).extend({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid mobile number is required"),
  city: z.string().min(2, "City is required"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  travelMonth: z.string().optional().or(z.literal("")),
  selectedPackage: z.string().optional().or(z.literal("")),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
