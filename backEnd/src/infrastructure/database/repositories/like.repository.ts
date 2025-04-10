import { prisma } from '../prismaClient';
import { LikeRepository } from '../../../domain/repositories/like.repository';

export class PrismaLikeRepository implements LikeRepository {

    async findByArticleId(articleId: string) {
        return await prisma.like.findMany({
            where: { articleId },
        });
    };

    async create(userId: string, articleId: string): Promise<boolean> {
        try {
            await prisma.like.create({
                data: { userId, articleId },
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async delete(userId: string, articleId: string): Promise<boolean> {
        try {
            await prisma.like.delete({
                where: {
                    userId_articleId: {
                        userId,
                        articleId,
                    },
                },
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}