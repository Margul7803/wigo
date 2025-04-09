import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    username: String
    email: String
  }

  type Query {
    getUser(username: String!): User
  }

  type Mutation {
    login(username: String!, password: String!): String
    register(username: String!, password: String!, email: String!): String
  }
`;
