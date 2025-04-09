import { prisma } from '../prismaClient';
import { ArticleRepository } from '../../../domain/repositories/article.repository';

export class PrismaArticleRepository implements ArticleRepository {

    async findById(id: string) {
        return await prisma.article.findUnique({
            where: { id },
        });
    };

    async create(title: string, content: string, authorId: string) {
        return await prisma.article.create({
            data: {
                title,
                content,
                authorId,
            },
        });
    };

    async update(id: string, title: string, content: string) {
        return await prisma.article.update({
            where: { id },
            data: {
                title,
                content,
                updatedAt: new Date(),
            },
        });
    };

    async delete(id: string): Promise<boolean> {
        try {
            await prisma.article.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            console.error('Error deleting article:', error);
            return false;
        }
    };

}