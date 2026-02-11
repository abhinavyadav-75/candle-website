import bcrypt from "bcrypt";
import { type InsertUser } from "@shared/schema";
import { storage } from "../storage";

async function createAdminUser() {
  const hash = await bcrypt.hash("admin123", 10);

  const adminUser: InsertUser = {
    username: "admin",
    password: hash
  };
  await storage.createUser(adminUser);
  console.log("Admin user created");
}

createAdminUser().catch(console.error);
