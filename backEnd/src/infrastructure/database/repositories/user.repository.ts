import { prisma } from '../prismaClient';
import { UserRepository } from '../../../domain/repositories/user.repository';

export class PrismaUserRepository implements UserRepository {

    async findByUsername(username: string) {
        return await prisma.user.findUnique({
            where: { username },
        });
    };

    async create(username: string, hashedPassword: string, email: string) {
        return await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            email,
        },
        });
    };
}