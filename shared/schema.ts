import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Theme schema for database
export const themes = pgTable("themes", {
  id: serial("id").primaryKey(),
  uuid: text("uuid").notNull().unique(),
  name: text("name").notNull(),
  frameColor: text("frame_color").notNull(),
  tabColor: text("tab_color").notNull(),
  toolbarColor: text("toolbar_color").notNull(),
  backgroundImage: text("background_image"),
  themeName: text("theme_name").notNull(),
  themeVersion: text("theme_version").notNull().default("1.0"),
  createdAt: text("created_at").notNull(),
});

// User schema if needed
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert schemas
export const insertThemeSchema = createInsertSchema(themes).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Types
export type InsertTheme = z.infer<typeof insertThemeSchema>;
export type Theme = typeof themes.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Frontend theme settings interface
export interface ThemeSettings {
  frameColor: string;
  tabColor: string;
  toolbarColor: string;
  backgroundImage: string | null;
  themeName: string;
  themeVersion: string;
}
