export class Article {
    constructor(
    public id: string,
    public title: string,
    public content: string,
    public createdAt: Date,
    public updatedAt: Date,
    public authorId: string,
    ) {}
}
  