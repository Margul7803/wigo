export class Comment {
    constructor(
    public id: string,
    public content: string,
    public authorId: string,
    public articleId: string,
    public createdAt: Date,
    ) {}
}
  