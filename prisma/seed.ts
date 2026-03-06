// prisma/seed.ts
import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

// validate env variables
const envSchema = z.object({
  ADMIN_MAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().optional(),
  ADMIN_NAME: z.string().optional(),
});

const env = envSchema.parse(process.env);

async function main() {
  if (!env.ADMIN_MAIL || !env.ADMIN_PASSWORD || !env.ADMIN_NAME) {
    console.warn(
      "⚠️  Seed skipped: ADMIN_MAIL, ADMIN_PASSWORD, and ADMIN_NAME env variables are not set.",
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  await prisma.user.upsert({
    where: { email: env.ADMIN_MAIL },
    update: {
      password: hashedPassword,
      name: env.ADMIN_NAME,
      role: "ADMIN",
    },
    create: {
      email: env.ADMIN_MAIL,
      password: hashedPassword,
      name: env.ADMIN_NAME,
      role: "ADMIN",
    },
  });
  console.log("✅ Seed done — admin user upserted.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
