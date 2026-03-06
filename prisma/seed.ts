// prisma/seed.ts
import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

// validate env variables
const envSchema = z.object({
  ADMIN_MAIL: z.string().email(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_NAME: z.string(),
});
const env = envSchema.parse(process.env);
async function main() {
  const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  await prisma.user.create({
    data: {
      email: env.ADMIN_MAIL,
      password: hashedPassword,
      name: env.ADMIN_NAME,
      role: "ADMIN",
    },
  });
  console.log("✅ Seed done");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
