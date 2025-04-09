// src/infrastructure/database/prismaClient.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log('📦 Connected to Prisma');
  } catch (error) {
    console.error('❌ Error connecting to Prisma:', error);
    throw error;
  }
}

async function disconnectPrisma() {
  await prisma.$disconnect();
  console.log('📦 Disconnected from Prisma');
}

export { prisma, connectPrisma, disconnectPrisma };
