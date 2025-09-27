import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const roles = ["admin", "user"];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { role_name: role },
      update: {}, // tidak di-update kalau sudah ada
      create: { role_name: role },
    });
  }

  const hashedPassword = await bcrypt.hash("123123", 10);

  await prisma.user.create({
    data: {
      full_name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      role_id: 1,
      avatar: "", // nanti bisa isi default avatar
    },
  });

  console.log("✅ Default roles and user seeded:", roles.join(", "));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding roles:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
