import { gql } from 'graphql-tag';

export const likeTypeDefs = gql`
  type Like {
    userId: String
    articleId: Date
  }

  type Query {
    getLikes(articleId: String!): [Like]
  }

  type Mutation {
    addLike(userId: String!, articleId: String!): Boolean
    removeLike(userId: String!, articleId: String!): Boolean
  }
`;
