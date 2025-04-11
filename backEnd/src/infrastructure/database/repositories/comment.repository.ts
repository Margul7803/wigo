import { prisma } from '../prismaClient';
import { CommentRepository } from '../../../domain/repositories/comment.repository';

export class PrismaCommentRepository implements CommentRepository {

    async findByArticleId(articleId: string) {
        const comment = await prisma.comment.findMany({
            where: { articleId },
            include: {
                author: true,
            },
        });

        return comment.map(comment => ({
            ...comment,
            userName: comment.author.username,
          })); 
    };

    async create(content: string, authorId: string, articleId: string) {
        return await prisma.comment.create({
            data: {
                content,
                authorId,
                articleId,
            },
        });
    };
}