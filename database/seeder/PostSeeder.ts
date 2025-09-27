import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  // Ambil user id dari user ke-5 sampai ke-10
  const users = await prisma.user.findMany({
    skip: 4, // lewati 4 user pertama → mulai dari user ke-5
    take: 6, // ambil 6 user → user ke-5 s.d ke-10
    orderBy: { id: "asc" }, // biar konsisten urutannya
  });

  for (const user of users) {
    const posts = Array.from({ length: 100 }, (_, i) => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(10),
      image:  'avatar/cmg1u6agf0003vtesobychnhd.png',
      userId: user.id,
    }));

    await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });

    console.log(`✅ 100 post berhasil dibuat untuk user ${user.id}`);
  }
}

main()
  .then(async () => {
    console.log("🎉 Semua post berhasil di-seed!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding posts:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
