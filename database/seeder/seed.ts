import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = ["USER", "ADMIN"];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { role_name: role },
      update: {}, // tidak di-update kalau sudah ada
      create: { role_name: role },
    });
  }

  console.log("✅ Default roles seeded:", roles.join(", "));
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
