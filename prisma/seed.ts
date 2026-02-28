// prisma/seed.ts
import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 12);

  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("✅ Seed done");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
