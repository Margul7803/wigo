import { gql } from "@apollo/client"

export const GET_ARTICLES = gql`
    query GetArticles($offset: Int, $limit: Int, $titleContains: String, $authorId: String) {
        getArticles(offset: $offset, limit: $limit, titleContains: $titleContains, authorId: $authorId) {
            id
            title
            content
            authorId
            createdAt
            updatedAt
            likesCount
            commentsCount
            comments {
                id
                content
                authorId
                articleId
                createdAt
            }
            likes {
                userId
            }
    }
}
`;

export const GET_ARTICLE = gql`
    query GetArticles($getArticleId: String!) {
        getArticle(id: $getArticleId) {
        title
        content
        authorId
        createdAt
        updatedAt
    }
}
`;

export const GET_COMMENTS = gql`
    query GetComments($articleId: String!) {
        getComments(articleId: $articleId) {
        content
        authorId
        articleId
        createdAt
    }
}
`;

export const GET_LIKES = gql`
    query GetLikes($articleId: String!) {
        getLikes(articleId: $articleId) {
        articleId
        userId
    }
}
`;