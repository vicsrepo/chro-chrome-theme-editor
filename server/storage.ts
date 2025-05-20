import { themes, users, type User, type InsertUser, type Theme, type InsertTheme } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Theme operations
  getAllThemes(): Promise<Theme[]>;
  getTheme(id: string): Promise<Theme | undefined>;
  createTheme(theme: InsertTheme): Promise<Theme>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private themes: Map<string, Theme>;
  private userCurrentId: number;
  private themeCurrentId: number;

  constructor() {
    this.users = new Map();
    this.themes = new Map();
    this.userCurrentId = 1;
    this.themeCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Theme methods
  async getAllThemes(): Promise<Theme[]> {
    return Array.from(this.themes.values());
  }
  
  async getTheme(uuid: string): Promise<Theme | undefined> {
    return Array.from(this.themes.values()).find(
      (theme) => theme.uuid === uuid,
    );
  }
  
  async createTheme(insertTheme: InsertTheme): Promise<Theme> {
    const id = this.themeCurrentId++;
    const now = new Date().toISOString();
    const theme: Theme = { 
      ...insertTheme, 
      id, 
      createdAt: now,
      backgroundImage: insertTheme.backgroundImage || null,
      themeVersion: insertTheme.themeVersion || "1.0"
    };
    this.themes.set(theme.uuid, theme);
    return theme;
  }
}

// Create and export a storage instance
export const storage = new MemStorage();
