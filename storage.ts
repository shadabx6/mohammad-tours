import { messages, contactSubmissions, type Message, type InsertMessage, type ContactSubmission, type InsertContact } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  createContactSubmission(submission: InsertContact): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async createContactSubmission(submission: InsertContact): Promise<ContactSubmission> {
    const [result] = await db
      .insert(contactSubmissions)
      .values(submission as any)
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
