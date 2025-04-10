import { gql } from 'graphql-tag';

export const commentTypeDefs = gql`
  scalar Date

  type Comment {
    id: String
    content: String
    authorId: String
    articleId: String
    createdAt: Date
  }

  type Query {
    getComments(articleId: String!): [Comment]
  }

  type Mutation {
    addComment(content: String!, articleId: String!): Comment
  }
`;
