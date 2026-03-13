import * as dotenv from "dotenv";
dotenv.config(); // Đọc file .env
dotenv.config({ path: ".env.local" }); // Đọc thêm cả .env.local nếu có

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// validate env variables
const envSchema = z.object({
  ADMIN_MAIL: z.string().email(),
  ADMIN_PASS: z.string(),
  ADMIN_NAME: z.string(),
});

const env = envSchema.parse(process.env);
async function main() {
  console.log("Đang mã hóa mật khẩu và tạo Admin...");
  const hashedPassword = await bcrypt.hash(env.ADMIN_PASS, 12);

  const existing = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        email: env.ADMIN_MAIL,
        password: hashedPassword,
        name: env.ADMIN_NAME,
        role: "ADMIN",
      },
    });
  } else {
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
  }

  console.log("✅ Seed done — admin user upserted.");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed database:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
