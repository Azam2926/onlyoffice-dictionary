import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Dictionary words table
export const words = pgTable("words", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 255 }).notNull(),
  script: varchar("script", { length: 20 }).notNull().default("latin"),
  flags: varchar("flags", { length: 26 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Prefixes table
export const prefixes = pgTable("prefixes", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 50 }).notNull(),
  script: varchar("script", { length: 10 }).notNull().default("latin"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Suffixes table
export const suffixes = pgTable("suffixes", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 50 }).notNull(),
  script: varchar("script", { length: 10 }).notNull().default("latin"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Dictionary settings table
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
