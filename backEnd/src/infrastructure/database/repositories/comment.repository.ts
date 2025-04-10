import { prisma } from '../prismaClient';
import { CommentRepository } from '../../../domain/repositories/comment.repository';

export class PrismaCommentRepository implements CommentRepository {

    async findByArticleId(articleId: string) {
        return await prisma.comment.findMany({
            where: { articleId },
        });
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