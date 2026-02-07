import bcrypt from "bcrypt";
import { User } from "./models/User";

async function createAdminUser() {
  const hash = await bcrypt.hash("admin123", 10);

  await User.create({
    username: "admin",
    password: hash,
    role: "admin",
  });
  console.log("Admin user created");
}

createAdminUser().catch(console.error);
