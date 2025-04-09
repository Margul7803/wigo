import { gql } from 'graphql-tag';

export const articleTypeDefs = gql`
  scalar Date

  type Article {
    title: String
    content: String
    authorId: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getArticle(id: String!): Article
  }

  type Mutation {
    postArticle(title: String!, content: String!): Article
    updateArticle(id: String!, content: String!, title: String!): Article
    deleteArticle(id: String!): Boolean
  }
`;
