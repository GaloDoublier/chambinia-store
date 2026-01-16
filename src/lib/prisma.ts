import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
//esto sirve para evitar que la recarga en caliente de nextjs provoque
//que se creen múltiples instancias del cliente Prisma, lo que podría agotar las conexiones a la base de datos

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
    const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;