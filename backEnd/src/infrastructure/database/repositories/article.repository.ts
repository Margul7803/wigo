import { prisma } from '../prismaClient';
import { ArticleRepository } from '../../../domain/repositories/article.repository';
import { Article } from '../../../domain/entities/Article';

export class PrismaArticleRepository implements ArticleRepository {

    async findById(id: string) {
        return await prisma.article.findUnique({
            where: { id },
        });
    };

    async findMany(filters?: { authorId?: string; titleContains?: string;}, pagination?: { limit?: number; offset?: number; }): Promise<Article[]> {
        const { authorId, titleContains } = filters || {};
        const { limit, offset } = pagination || {};
        const where: any = {
            ...(authorId && { authorId }),
            ...(titleContains && { title: { contains: titleContains } }),
        };

        const articles = await prisma.article.findMany({
            where,
            include: {
                likes: true,
                comments: true,
            },
            take: limit,
            skip: offset,
        });
        
        return articles.map(article => ({
            ...article,
            likesCount: article.likes.length,
            commentsCount: article.comments.length,
          }));
    }

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