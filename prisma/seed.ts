import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Empezando el seed...');

  // Limpiar DB
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Crear Categorías
  const catRopa = await prisma.category.create({
    data: { name: 'Ropa', slug: 'ropa' },
  });

  const catTecno = await prisma.category.create({
    data: { name: 'Tecnología', slug: 'tecnologia' },
  });

  // Crear Productos
  await prisma.product.createMany({
    data: [
      {
        name: 'Camiseta Oversize Negra',
        description: 'Algodón 100%.',
        price: 25.99,
        image: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Camiseta',
        stock: 50,
        slug: 'camiseta-oversize-negra',
        categoryId: catRopa.id,
      },
      {
        name: 'Auriculares Pro',
        description: 'Cancelación de ruido.',
        price: 150.00,
        image: 'https://placehold.co/600x400/333333/FFFFFF/png?text=Audio',
        stock: 15,
        slug: 'auriculares-pro',
        categoryId: catTecno.id,
      },
    ],
  });

  console.log('✅ Seed finalizado correctamente');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });