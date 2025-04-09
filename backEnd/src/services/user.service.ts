import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserService {
  findUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
      where: { username },
    });
  };

  createUser = async (username: string, password: string, email: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
      
    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
  };
}